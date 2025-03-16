import React from "react";
import { useCart } from "../Context/CartContext";

const CartPage = () => {
  const { cart, removeFromCart, updateCart } = useCart();
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="max-w-6xl mx-auto p-6 pt-50 bg-white rounded-lg shadow-lg grid grid-cols-1 md:grid-cols-2 gap-6 mt-10">
      {/* Left Column: Cart Items */}
      <div>
        <h2 className="text-2xl font-semibold mb-4">Shopping Cart</h2>
        {cart.length === 0 ? (
          <p className="text-gray-500">Your cart is empty.</p>
        ) : (
          <div className="space-y-4">
            {cart.map((item) => (
              <div
                key={item.id}
                className="flex justify-between items-center border p-4 rounded-lg"
              >
                <div className="flex items-center space-x-4">
                  <img
                    src={item.images[0]?.src}
                    alt={item.name}
                    className="w-16 h-16 object-cover rounded-md"
                  />
                  <div>
                    <p className="font-medium">{item.name}</p>
                    <p className="text-sm text-gray-500">${item.price} each</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    className="p-2 bg-gray-200 rounded-full hover:bg-gray-300"
                    onClick={() => updateCart(item.id, item.quantity - 1)}
                  >
                    -
                  </button>
                  <span className="font-medium">{item.quantity}</span>
                  <button
                    className="p-2 bg-gray-200 rounded-full hover:bg-gray-300"
                    onClick={() => updateCart(item.id, item.quantity + 1)}
                  >
                    +
                  </button>
                  <button
                    className="p-2 text-red-500 hover:text-red-700"
                    onClick={() => removeFromCart(item.id)}
                  >
                    ✖
                  </button>
                </div>
              </div>
            ))}
            <div className="flex justify-between font-semibold text-lg mt-4">
              <span>Total:</span>
              <span>${total}</span>
            </div>
          </div>
        )}
      </div>

      {/* Right Column: Order Summary and Checkout */}
      <div className="border p-4 rounded-lg">
        <h2 className="text-2xl font-semibold mb-4">Order Summary</h2>
        <div className="space-y-4">
          <div className="flex justify-between font-medium text-lg">
            <span>Subtotal</span>
            <span>${total}</span>
          </div>
          <div className="flex justify-between font-medium text-lg">
            <span>Shipping</span>
            <span>Calculated at checkout</span>
          </div>
        </div>
        <div className="mt-6 flex justify-center">
          <button className="w-full bg-[#1e3c72] text-white py-2 px-4 rounded-lg hover:bg-[#1e3c72]">
            Proceed to Checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
