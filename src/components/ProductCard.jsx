import { Link } from "react-router-dom";
import React from "react";
import { useCart } from "../Context/CartContext";

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();
  return (
    <div
      key={product.id}
      className="bg-white shadow-lg rounded-lg overflow-hidden transition-transform transform hover:scale-105 hover:shadow-2xl"
    >
      <Link to={`/product/${product.id}`}>
        <img
          src={product.images[0]?.src}
          alt={product.name}
          className="w-full h-auto object-cover"
        />
      </Link>
      <div className="p-4">
        <h2 className="text-[16px] font-semibold text-gray-800 truncate">
          {product.name}
        </h2>
        <p className="text-gray-500 text-[15px] mt-1">${product.price}</p>

        {/* <button
          onClick={() => addToCart(product, 1)}
          className="mt-4 w-full py-2 bg-[#1e3c72] text-white rounded-lg hover:bg-[#1e3c72] transition duration-200"
        >
          add to cart
        </button> */}
      </div>
    </div>
  );
};

export default ProductCard;
