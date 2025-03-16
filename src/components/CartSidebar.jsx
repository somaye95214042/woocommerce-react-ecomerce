import React  from "react";
import { Link } from "react-router-dom";

const CartSidebar = ({ cart, isOpen, toggleCart, removeFromCart }) => {

  // Calculate the total price
  const totalPrice = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <div
      className={`fixed top-0 right-0 h-full w-96 bg-white shadow-lg transform ${
        isOpen ? "translate-x-0" : "translate-x-full"
      } transition-transform duration-300 ease-in-out z-50 flex flex-col`}
    >
      {/* Header */}
      <div className="flex justify-between items-center p-4 border-b">
        <h2 className="text-lg font-semibold">Shopping Cart</h2>
        <button
          onClick={toggleCart}
          className="text-gray-500 hover:text-gray-700 text-2xl"
        >
          ✕
        </button>
      </div>

      {/* Cart Items */}
      <div className="flex-1 p-4 overflow-y-auto">
        {cart.length === 0 ? (
          <p className="text-gray-500 text-center mt-10">Your cart is empty.</p>
        ) : (
          <ul className="space-y-6">
            {cart.map((item) => (
              <li key={item.id} className="flex items-center">
                {/* Product Image */}
                <img
                  src={item.images[0].src}
                  alt={item.name}
                  className="w-20 h-20 rounded-lg object-cover"
                />

                {/* Product Details */}
                <div className="flex-1 ml-6">
                  <h3 className="text-base font-medium">{item.name}</h3>
                  <p className="text-gray-900 font-semibold text-lg">${item.price}</p>
                  <p className="text-gray-600 text-sm">Qty {item.quantity}</p>
                </div>

                {/* Remove Button */}
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="text-red-600 text-sm hover:text-red-800"
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Total Price */}
      {cart.length > 0 && (
        <div className="p-4 border-t">
          <div className="flex justify-between text-lg font-semibold">
            <span>Total Price:</span>
            <span>${totalPrice.toFixed(2)}</span>
          </div>
        </div>
      )}

      {/* Buttons - View Cart and Checkout */}
      {cart.length > 0 && (
        <div className="p-4 border-t bg-white space-y-4">
          {/* View Cart Button */}
          <Link to="/cart">
            <button
              className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition text-lg font-semibold focus:outline-none mb-4"
              onClick={toggleCart}
            >
              View Cart
            </button>
          </Link>

          {/* Checkout Button */}
          <Link to="/checkout">
            <button
              className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition text-lg font-semibold focus:outline-none"
              onClick={toggleCart}
            >
              Checkout
            </button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default CartSidebar;
