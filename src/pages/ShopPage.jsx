import { useState, useEffect } from "react";
import { fetchProducts } from "../utils/WooCommerceApi";
import { Link } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import ShopPageLoader from "../components/ShopPageLoader";

const ShopPage = () => {
  const [sortedProducts, setSortedProducts] = useState([]);
  const [products, setProducts] = useState([]);
  const [sortOrder, setSortOrder] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const perPage = 8;

  // useEffect(() => {
  //   const loadProducts = async () => {
  //     const data = await fetchProducts(currentPage, productsPerPage);
  //     setProducts(data.products);
  //     setTotalPages(data.totalPages);
  //   };
  //   loadProducts();
  // }, [currentPage]);

  useEffect(() => {
    const getProducts = async () => {
      try {
        const { products, totalPages } = await fetchProducts(
          currentPage,
          perPage
        );
        setProducts(products);
        setTotalPages(totalPages);
      } catch (error) {
        console.error(error);
      }
    };

    getProducts();
  }, [currentPage]);

  const sortProducts = (order) => {
    let sortedList = [...products];
    if (order === "low-to-high") sortedList.sort((a, b) => a.price - b.price);
    if (order === "high-to-low") sortedList.sort((a, b) => b.price - a.price);
    setSortedProducts(sortedList);
  };

  const handleSortChange = (event) => {
    const order = event.target.value;
    setSortOrder(order);
    sortProducts(order);
  };

  useEffect(() => {
    sortProducts(sortOrder);
  }, [products]);

  const handlePrev = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const handleNext = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  const handlePageClick = (page) => {
    setCurrentPage(page);
  };

  const renderPageNumbers = () => {
    const pages = [];
    for (let i = 1; i <= totalPages; i++) {
      pages.push(
        <button
          key={i}
          onClick={() => handlePageClick(i)}
          className={`px-3 py-1 rounded ${
            i === currentPage ? "bg-[#162b54] text-white" : "bg-gray-200"
          }`}
        >
          {i}
        </button>
      );
    }
    return pages;
  };

  // const handlePageChange = (page) => setCurrentPage(page);

  if (!products.length) return <ShopPageLoader />;

  return (
    <div className="bg-gray-50 min-h-screen mb-[50px]">
      <div className="container mx-auto px-4 py-10 pt-40">
        {/* Grid layout with a narrower sidebar */}
        <div className="grid grid-cols-1 lg:grid-cols-[0.75fr_3.75fr] gap-8">
          {/* Sidebar with reduced width */}
          <aside className="bg-white shadow-lg p-6 rounded-lg w-full lg:w-80">
            <h2 className="text-xl font-semibold text-gray-700 mb-4">
              Filter by Category
            </h2>
            <ul className="space-y-2">
              <Link
                to="/shop"
                className="text-gray-600 hover:text-indigo-600 cursor-pointer block"
              >
                All Products
              </Link>

              <Link
                to="/product-category/women's%20clothing"
                className="text-gray-600 hover:text-indigo-600 cursor-pointer block"
              >
                Women Clothing
              </Link>

              <Link
                to="/product-category/men's%20clothing"
                className="text-gray-600 hover:text-indigo-600 cursor-pointer block"
              >
                Men Clothing
              </Link>

              <Link
                to="http://localhost:3000/product-category/jewelery"
                className="text-gray-600 hover:text-indigo-600 cursor-pointer block"
              >
                Accessories
              </Link>
            </ul>
          </aside>

          {/* Main Content */}
          <div>
            {/* Sorting Dropdown */}
            <div className="flex justify-end mb-6">
              <select
                className="bg-white border border-gray-300 text-gray-700 py-2 px-4 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#1e3c72] focus:border-[#1e3c72] cursor-pointer"
                value={sortOrder}
                onChange={handleSortChange}
              >
                <option value="">Sort by Default</option>
                <option value="low-to-high">Price: Low to High</option>
                <option value="high-to-low">Price: High to Low</option>
              </select>
            </div>

            {/* Product Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {sortedProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>

            {/* Pagination */}
            {/* <div className="mt-16 flex justify-center">
              <nav
                className="inline-flex rounded-md shadow-sm -space-x-px"
                aria-label="Pagination"
              >
                <button
                  onClick={() =>
                    handlePageChange(currentPage > 1 ? currentPage - 1 : 1)
                  }
                  className={`relative inline-flex items-center px-4 py-2 text-sm font-medium border border-gray-300 rounded-l-md ${
                    currentPage === 1
                      ? "text-gray-300 cursor-not-allowed"
                      : "text-gray-500 hover:bg-gray-50"
                  }`}
                  disabled={currentPage === 1}
                >
                  &lt; Previous
                </button>

                {[...Array(totalPages)].map((_, index) => (
                  <button
                    key={index}
                    onClick={() => handlePageChange(index + 1)}
                    className={`relative inline-flex items-center px-4 py-2 text-sm font-medium border border-gray-300 ${
                      currentPage === index + 1
                        ? "bg-[#1e3c72] text-white"
                        : "bg-white text-gray-500 hover:bg-gray-50"
                    }`}
                  >
                    {index + 1}
                  </button>
                ))}

                <button
                  onClick={() =>
                    handlePageChange(
                      currentPage < totalPages ? currentPage + 1 : totalPages
                    )
                  }
                  className={`relative inline-flex items-center px-4 py-2 text-sm font-medium border border-gray-300 rounded-r-md ${
                    currentPage === totalPages
                      ? "text-gray-300 cursor-not-allowed"
                      : "text-gray-500 hover:bg-gray-50"
                  }`}
                  disabled={currentPage === totalPages}
                >
                  Next &gt;
                </button>
              </nav>
            </div> */}
          </div>
        </div>
      </div>
      {/* Pagination */}
      <div className="flex justify-center items-center mt-8 space-x-2">
        <button
          onClick={handlePrev}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
        >
          Previous
        </button>

        {renderPageNumbers()}

        <button
          onClick={handleNext}
          disabled={currentPage === totalPages}
          className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default ShopPage;
