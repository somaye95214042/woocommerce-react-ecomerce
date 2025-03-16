import lady from "../assets/lady.jpg";
import fashion from "../assets/fashion.jpg";
import gallery1 from "../assets/gallery-1.jpg";
import gallery2 from "../assets/gallery-2.jpg";
import gallery3 from "../assets/gallery-3.jpg";
import gallery4 from "../assets/gallery-4.jpg";
import gallery5 from "../assets/gallery-5.jpg";
import gallery6 from "../assets/gallery-6.jpg";
import gallery7 from "../assets/gallery-7.jpg";
import gallery8 from "../assets/gallery-8.jpg";
import { useState, useEffect } from "react";
import axios from "axios";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const HomePage2 = () => {
  const images = [
    gallery1,
    gallery2,
    gallery3,
    gallery4,
    gallery5,
    gallery6,
    gallery7,
    gallery8,
  ];

  const [posts, setPosts] = useState([]);

  useEffect(() => {
    // Replace this URL with your WordPress API endpoint
    axios
      .get("http://localhost/fashion/wp-json/wp/v2/posts?_embed")
      .then((response) => {
        // You can map the data as needed
        setPosts(response.data);
      })
      .catch((error) => {
        console.error("Error fetching posts:", error);
      });
  }, []);

  console.log(posts);
  return (
    <>
      <div className="grid grid-cols-[58%_42%]">
        <div className="bg-[#fee7cd] flex flex-col p-8 pt-30">
          <h1 className="text-[82px] font-bold leading-[1.3em] text-[#1e3c72] pt-30">
            Emma Matteo
          </h1>
          <h1 className="text-[#1e3c72] text-4xl font-normal uppercase leading-[1.4em] tracking-[7.56px] pb-10 pt-10">
            Fashion Model
          </h1>
          <p className="text-[#2d2d2d] pb-5 w-1/2 mt-2 text-[18px] font-normal leading-[1.4em] tracking-[0.54px]">
            Serenity has taken possession of my entire soul, like these sweet
            mornings of spring which I enjoy. When, while the lovely.
          </p>
          <button className="mt-4 w-40 bg-[#1e3c72] text-white px-6 py-3 mb-40 font-medium hover:bg-[#000]">
            DISCOVER
          </button>
          <img src={lady} alt="Description" className="w-104 h-62 mb-50" />
        </div>

        <div className="bg-[#1e3c72] flex flex-col p-8">
          <img
            src={fashion}
            alt="Description"
            className="absolute left-1/2 transform -translate-x-30 top-1/2 -translate-y-20 w-193 h-237 z-10"
          />
        </div>
      </div>
      <div className="grid grid-cols-[58%_42%] bg-[#fee7cd]">
        <div className="flex flex-col p-8 pt-30">
          <h1 className="text-[#1e3c72] text-4xl font-normal uppercase leading-[1.4em] tracking-[7.56px] pb-10 pt-30">
            Runway shows
          </h1>
          <h1 className="text-[82px] font-bold leading-[1.3em] text-[#1e3c72]">
            Photo Gallery
          </h1>
        </div>

        <div className="flex flex-col p-8">
        
        </div>
      </div>
      <div className="bg-[#fee7cd]">
        <div className="container mx-auto px-4 py-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            {images.map((src, index) => (
              <div
                key={index}
                className="relative w-full h-100 overflow-hidden rounded-lg shadow-lg"
              >
                <img
                  src={src}
                  alt={`Gallery image ${index + 1}`}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="container mx-auto px-4 py-10">
        <div className="carousel-container">
          <Swiper
            spaceBetween={10} // Space between slides
            slidesPerView={3} // Number of slides visible at once
            loop={true} // Enable looping of slides
            pagination={{ clickable: true }} // Add pagination controls
            autoplay={{ delay: 3000 }} // Autoplay slides every 3 seconds
          >
            {posts.map((post) => (
              <SwiperSlide key={post.id}>
                <div className="rounded-2xl overflow-hidden shadow-lg">
                  {/* Use a fallback image if there is no image in the post */}
                  <img
                    src={post._embedded["wp:featuredmedia"][0].source_url}
                    alt={post.title.rendered}
                    className="w-full h-120 object-cover"
                  />
                  <div className="p-4">
                    <h3 className="text-lg font-semibold">
                      {post.title.rendered}
                    </h3>
                    <p
                      className="text-sm text-gray-600 mt-2"
                      dangerouslySetInnerHTML={{
                        __html: post.excerpt.rendered,
                      }}
                    ></p>
                    {/* Add a Read More button or link if needed */}
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </>
  );
};

export default HomePage2;
