/* eslint-disable react/no-unescaped-entities */
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

//***all imported for swiper******//
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore from 'swiper';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css/bundle';
import ListingItem from '../assets/components/ListingItem';
//***all imported for swiper******//

// Adding a custome style to Link dive
const customStyles = {
  backgroundColor: '#E2E8F0', // Background color
  color: '#1E40AF', // Text color
};

//adding selected images
const imageUrls = [
  'https://firebasestorage.googleapis.com/v0/b/mern-real-estate-f0bc6.appspot.com/o/home%20slider%202.jpg1698491238300?alt=media&token=8a0cb630-fc84-47a0-93d4-0c8ef626ec37',
  'https://firebasestorage.googleapis.com/v0/b/mern-real-estate-f0bc6.appspot.com/o/home%20slider%203.jpg1698491238302?alt=media&token=433eee9a-1186-4937-9150-4aa3252910e6',
  'https://firebasestorage.googleapis.com/v0/b/mern-real-estate-f0bc6.appspot.com/o/home%20slider%204.jpg1698491238302?alt=media&token=f57e38f4-e20c-4851-928e-4685a2e22dd8',
  'https://firebasestorage.googleapis.com/v0/b/mern-real-estate-f0bc6.appspot.com/o/home%20slider%207.jpg1698491248137?alt=media&token=f649d926-237b-49b6-a1c2-a5d6ef968154',
  'https://firebasestorage.googleapis.com/v0/b/mern-real-estate-f0bc6.appspot.com/o/home%20slider.jpg1698491248137?alt=media&token=1c3d1370-dbb4-49c8-b2b4-2187a90e3c8a',
];

export default function Home() {
  SwiperCore.use([Navigation, Pagination, Autoplay]);

  const [offerListings, setOfferListings] = useState([]);
  const [rentListings, setRentListings] = useState([]);
  const [saleListings, setSaleListings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchOfferListings = async () => {
      try {
        setError(false);
        setLoading(true);
        const res = await fetch('/api/listing/search?offer=true&limit=4');
        const data = await res.json();
        setOfferListings(data);
        setError(false);
        fetchRentListings();
      } catch (error) {
        setError(false);
        console.log(error);
        setError(true);
      }
    };
    fetchOfferListings();

    const fetchRentListings = async () => {
      try {
        setError(false);
        setLoading(true);
        const res = await fetch('/api/listing/search?type=rent&limit=4');
        const data = await res.json();
        setRentListings(data);
        setError(false);
        fetchSaletListings();
      } catch (error) {
        setError(false);
        console.log(error);
        setError(true);
      }
    };
    const fetchSaletListings = async () => {
      try {
        setError(false);
        setLoading(true);
        const res = await fetch('/api/listing/search?type=sale&limit=4');
        const data = await res.json();
        setSaleListings(data);
        setError(false);
      } catch (error) {
        setError(false);
        console.log(error);
        setError(true);
      }
    };
  }, []);

  return (
    <div>
      {/* swiper details */}
      <div className="relative">
        <Swiper
          slidesPerView={1}
          //navigation
          autoplay={{
            delay: 2000,
            disableOnInteraction: false, // Autoplay continues even after user interactions
          }}
          pagination={{ clickable: true }}
        >
          {imageUrls.map((img, index) => (
            <SwiperSlide key={index}>
              <div
                className="h-[450px]"
                style={{
                  background: `url(${img}) center no-repeat`,
                  backgroundSize: 'cover',
                }}
              ></div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* top details */}
      <div className="absolute top-24 flex flex-col gap-1 sm:gap-3 py-10 px-5 md:py-15 md:px-16 z-10">
        <h1
          className="font-bold text-slate-700 text-3xl mr-auto text-left lg:text-6xl "
          style={{ textShadow: '10px -3px 10px #FFFFFF' }}
        >
          Find your next{' '}
          <span className="text-slate-500 bg-gradient">perfect</span> <br />
          place with <span className="text-slate-500">ease</span>
        </h1>
        <div className="text-gray-800 text-xs sm:text-xl font-semibold my-3 bg-slate-50 rounded-md bg-opacity-40">
          <p>
            Discover your dream home effortlessly with us. Find the perfect
            place
          </p>
          <p>to create lasting memories and start your new journey today.</p>
        </div>
        <p className="text-gray-700 font-bold bg-white mr-auto rounded-md p-1 bg-opacity-90">
          Your perfect place is just a click away.
        </p>

        <Link
          to={'/search'}
          className="bg-slate-500 mr-auto font-semibold rounded-lg p-2 sm:p-3 hover:underline text-blue-900"
          style={customStyles}
        >
          Let's get started
        </Link>
      </div>

      {/* fature listing by offer, rent and sale */}
      <div className="max-w-full mx-2 sm:mx-5 md:mx-10 p-2 flex flex-col gap-8 my-3 md:my-5 overflow-x-hidden">
        <div>
          {offerListings && offerListings.length > 0 && (
            <div className="w-full">
              <div className="flex flex-row justify-between items-center text-center">
                <h1 className=" text-md md:text-2xl  font-bold">
                  Recent Homes with Offer
                </h1>
                <Link
                  to={'/search?offer=true'}
                  className="text-sm md:text-lg text-blue-700 font-semibold"
                >
                  See more offers
                </Link>
              </div>
              <div className="w-full md:w-[80%]">
                <div className="flex flex-col md:flex-row gap-4">
                  {offerListings.map((listing) => (
                    <ListingItem key={listing._id} listing={listing} />
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
        <div>
          {rentListings && rentListings.length > 0 && (
            <div className="w-full">
              <div className="flex flex-row justify-between items-center text-center">
                <h1 className=" text-md md:text-2xl  font-bold">
                  Recent Homes for Rent
                </h1>
                <Link
                  to={'/search?offer=true'}
                  className="text-sm md:text-lg text-blue-700 font-semibold"
                >
                  See more rent
                </Link>
              </div>
              <div className="w-full md:w-[80%]">
                <div className="flex flex-col md:flex-row gap-4">
                  {rentListings.map((listing) => (
                    <ListingItem key={listing._id} listing={listing} />
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
        <div>
          {saleListings && saleListings.length > 0 && (
            <div className="w-full">
              <div className="flex flex-row justify-between items-center text-center">
                <h1 className=" text-md md:text-2xl font-bold">
                  Recent Homes for Sale
                </h1>
                <Link
                  to={'/search?offer=true'}
                  className=" text-sm md:text-lg text-blue-700 font-semibold"
                >
                  See more sale
                </Link>
              </div>
              <div className="w-full md:w-[80%]">
                <div className="flex flex-col md:flex-row gap-4">
                  {saleListings.map((listing) => (
                    <ListingItem key={listing._id} listing={listing} />
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
