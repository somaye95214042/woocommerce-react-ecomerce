import React from "react";

const ShopPageLoader = () => {
  return (
    <div className="px-6 py-50 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {[...Array(8)].map((_, index) => (
        <div key={index} className="animate-pulse space-y-4 p-4 bg-gray-200 rounded-xl">
          <div className="w-full h-40 bg-gray-300 rounded-lg"></div>
          <div className="h-4 bg-gray-300 rounded w-3/4"></div>
          <div className="h-4 bg-gray-300 rounded w-1/2"></div>
        </div>
      ))}
    </div>
  );
};

export default ShopPageLoader;
