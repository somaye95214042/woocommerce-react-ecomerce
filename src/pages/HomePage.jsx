import autumn from "../assets/autumn_collection_bg.jpg";
import winter from "../assets/winter_collection_bg.jpg";
import trend from "../assets/trending_bg_gray.jpg";
import shits from "../assets/shits_bg_color.jpg";
import glassware from "../assets/glassware_bg_color.jpg";
import banner from "../assets/shop-slider-700.jpg";
// import { fetchBestSellerProducts } from "../utils/WooCommerceApi";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

const HomePage = () => {
  // const [bestSellerProducts, setBestSellerProducts] = useState(null);

  // useEffect(() => {
  //   const fetchBestSellers = async () => {
  //     const data = await fetchBestSellerProducts();
  //     setBestSellerProducts(data);
  //   };
  //   fetchBestSellers();
  // }, []);

  return (
    <>
      <div
        className="w-full h-screen bg-cover bg-no-repeat bg-center flex flex-col justify-center items-center"
        style={{ backgroundImage: `url(${banner})` }}
      >
        <h1 className="text-[30px] md:text-[100px] font-extrabold text-white">
          OUR PRODUCTS
        </h1>
        <h2 className="text-[30px] md:text-[50px] pb-10 font-thin text-white text-center">
          A collection of all our modern products
        </h2>
      </div>

      <div className="container mx-auto flex flex-col md:flex-row pt-20 md:gap-x-10 ">
        <div
          className="w-full md:w-1/2 h-screen flex flex-col items-center justify-center bg-cover bg-center text-white p-6"
          style={{ backgroundImage: `url(${winter})` }}
        >
          <h1 className="text-[50px] py-10 font-medium text-center">
            Winter Collection
          </h1>
          <h1 className="text-[30px] pb-10 font-light text-center">
            STYLISH AND WARM
          </h1>
          <Link to="/shop">
            <button className="text-white text-[18px] rounded-full font-medium border-3 border-white px-6 py-4 cursor-pointer">
              VIEW MORE
            </button>
          </Link>
        </div>

        <div
          className="w-full md:w-1/2 h-screen flex flex-col items-center justify-center bg-cover bg-center text-white p-6"
          style={{ backgroundImage: `url(${autumn})` }}
        >
          <h1 className="text-[50px] py-10 font-medium text-center">
            Spring Collection
          </h1>
          <h1 className="text-[30px] pb-10 font-light text-center">
            BRIGHT AND COLORFUL
          </h1>

          <Link to="/shop">
            <button className="text-white text-[18px] rounded-full font-medium border-3 border-white px-6 py-4 cursor-pointer">
              VIEW MORE
            </button>
          </Link>
        </div>
      </div>

      <div className="container mx-auto flex flex-col md:flex-row gap-5 pt-20">
        <div
          className="w-full md:w-1/3 h-screen flex flex-col items-center justify-center bg-cover bg-center text-white p-6"
          style={{ backgroundImage: `url(${shits})` }}
        >
          <h1 className="text-[50px] py-10 font-medium text-center">
            Winter Collection
          </h1>
          <h1 className="text-[30px] pb-10 font-light text-center">
            STYLISH AND WARM
          </h1>
          <Link to="/shop">
            <button className="text-white text-[18px] rounded-full font-medium border-3 border-white px-6 py-4 cursor-pointer">
              VIEW MORE
            </button>
          </Link>
        </div>

        <div
          className="w-full md:w-1/3 h-screen flex flex-col items-center justify-center bg-cover bg-center text-white p-6"
          style={{ backgroundImage: `url(${trend})` }}
        >
          <h1 className="text-[50px] py-10 font-medium text-center">
            Winter Collection
          </h1>
          <h1 className="text-[30px] pb-10 font-light text-center">
            STYLISH AND WARM
          </h1>
          <Link to="/shop">
            <button className="text-white text-[18px] rounded-full font-medium border-3 border-white px-6 py-4 cursor-pointer">
              VIEW MORE
            </button>
          </Link>
        </div>

        <div
          className="w-full md:w-1/3 h-screen flex flex-col items-center justify-center bg-cover bg-center text-white p-6"
          style={{ backgroundImage: `url(${glassware})` }}
        >
          <h1 className="text-[50px] py-10 font-medium text-center">
            Winter Collection
          </h1>
          <h1 className="text-[30px] pb-10 font-light text-center">
            STYLISH AND WARM
          </h1>
          <Link to="/shop">
            <button className="text-white text-[18px] rounded-full font-medium border-3 border-white px-6 py-4 cursor-pointer">
              VIEW MORE
            </button>
          </Link>
        </div>
      </div>
    </>
  );
};

export default HomePage;
