import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore from "swiper";
import { Navigation } from "swiper/modules";
import "swiper/css/bundle";

export default function Listing() {
  SwiperCore.use([Navigation]);
  const params = useParams();

  const [listing, setListing] = useState(null); // Use square brackets for destructuring
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchListing = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/listing/get/${params.listingId}`, {
          method: "GET",
        });

        const data = await res.json();

        if (data.success === false) {
          setLoading(false);
          setError(true);

          return;
        }

        setListing(data);
        setLoading(false);
        setError(false);
      } catch (error) {
        setError(true);
        setLoading(false);
      }
    };
    fetchListing();
    // Pass an empty dependency [] array to run this effect only once
  }, [params.listingId]); // Passing [params.listingId] to run effect when listingId changes

  return (
    <main>
      {loading && (
        <p className="text-2xl text-center my-5 font-semibold">Loading...</p>
      )}
      {error && (
        <p className="text-2xl text-center my-5 text-red-700 font-semibold">
          Something went wrong
        </p>
      )}
      {listing && !loading && !error && (
        <>
          <Swiper navigation>
            {listing.imageUrls.map((url) => (
              <SwiperSlide key={url}>
                <div
                  className="relative h-[350px] mx-20"
                  style={{
                    background: `url(${url}) center no-repeat`,
                    backgroundSize: "cover",
                  }}
                ></div>
              </SwiperSlide>
            ))}
          </Swiper>
        </>
      )}
    </main>
  );
}
