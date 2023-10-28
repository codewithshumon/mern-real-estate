/* eslint-disable react/no-unescaped-entities */
/* eslint-disable no-unused-vars */
import React from "react";

export default function About() {
  return (
    <div className="flex flex-col gap-4">
      <div className="text-center mt-16">
        <h1 className="font-bold text-slate-800 text-3xl lg:text-5xl">
          About Shumon Estate
        </h1>
      </div>
      <div className="flex flex-col gap-5 px-20">
        <div>
          <h2 className="text-2xl font-semibold">Our Story</h2>
          <p className="text-lg text-gray-600">
            Shumon Estate was founded by [Founder's Name] with a vision to
            create a real estate agency that prioritizes the unique needs of
            each client. It all started with a belief that real estate is not
            just about buying and selling properties but building relationships
            and fostering trust. Our journey began with a single goal: to
            provide exceptional service while simplifying the often complex
            process of buying, selling, or renting real estate.
          </p>
        </div>
        <div>
          <h2 className="text-2xl font-semibold">Our Mission</h2>
          <p className="text-lg text-gray-600">
            Our mission at Shumon Estate is to be your guide in the real estate
            world, offering a blend of expertise, integrity, and innovation. We
            strive to make every real estate transaction a seamless, enjoyable
            experience, driven by a commitment to your best interests. We
            believe in exceeding your expectations and ensuring your complete
            satisfaction.
          </p>
        </div>
        <div>
          <h2 className="text-2xl font-semibold">Why Choose Shumon Estate?</h2>
          <ul className="list-disc pl-6 text-lg text-gray-600">
            <li>
              <strong>Expertise:</strong> Our team comprises experienced
              professionals who have a deep understanding of local markets.
              We're here to provide you with insights, advice, and a strategic
              approach tailored to your unique real estate needs.
            </li>
            <li>
              <strong>Personalized Service:</strong> We understand that every
              client is different. That's why we take a personalized approach to
              address your specific goals, whether you're looking to buy, sell,
              or rent property.
            </li>
            <li>
              <strong>Transparency:</strong> We believe in transparency at every
              step of the real estate journey. You'll be well-informed
              throughout the process, so you can make confident decisions.
            </li>
            <li>
              <strong>Strong Network:</strong> Shumon Estate has built strong
              connections within the industry. We can connect you with mortgage
              brokers, legal professionals, home inspectors, and other experts
              to ensure a smooth experience.
            </li>
            <li>
              <strong>Community Involvement:</strong> We're not just passionate
              about real estate; we're passionate about our community. Shumon
              Estate is involved in local initiatives and believes in giving
              back.
            </li>
          </ul>
        </div>
        <div>
          <h2 className="text-2xl font-semibold">Our Services</h2>
          <ul className="list-disc pl-6 text-lg text-gray-600">
            <li>
              <strong>Buying:</strong> Our experts will guide you through the
              entire home-buying process, helping you find your dream home that
              fits your budget and lifestyle.
            </li>
            <li>
              <strong>Selling:</strong> If you're looking to sell your property,
              we'll provide you with a comprehensive marketing strategy and
              expert negotiation skills to secure the best deal.
            </li>
            <li>
              <strong>Renting:</strong> Whether you're a tenant or a landlord,
              we'll assist you in finding the perfect rental property or
              managing your rental assets.
            </li>
            <li>
              <strong>Investment:</strong> For those looking to invest in real
              estate, we offer valuable insights into profitable investment
              opportunities.
            </li>
          </ul>
        </div>
        <div>
          <h2 className="text-2xl font-semibold">Our Commitment to You</h2>
          <p className="text-lg text-gray-600">
            At Shumon Estate, our commitment goes beyond transactions; it's
            about building lasting relationships with our clients. We are
            devoted to your success, and our success is measured by your
            satisfaction. We believe in setting the industry standard for
            excellence, and we'll continue to evolve with the ever-changing real
            estate landscape.
          </p>
        </div>
        <div>
          <h2 className="text-2xl font-semibold">Contact Us</h2>
          <p className="text-lg text-gray-600">
            Ready to embark on your real estate journey with Shumon Estate?
            Reach out to our dedicated team today to get started. We look
            forward to being your trusted partner in achieving your real estate
            goals.
          </p>
          <address>
            <p className="text-lg text-gray-600">
              <strong>Address:</strong> 4021 San Marino Blvd APT 207, West Palm
              Beach, FL 33409
            </p>
            <p className="text-lg text-gray-600">
              <strong>Email:</strong> info.softexel@gmail.com
            </p>
          </address>
        </div>
        <div>
          <p className="text-lg text-gray-600 mb-7 font-semibold  text-center">
            Thank you for considering Shumon Estate for your real estate needs.
            We are here to turn your property aspirations into reality.
          </p>
        </div>
      </div>
    </div>
  );
}
