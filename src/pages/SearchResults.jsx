import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchSearchProducts } from "../utils/WooCommerceApi";
import ProductCard from "../components/ProductCard";

export default function SearchResults() {
  // const [searchParams] = useSearchParams();
  // const query = searchParams.get("query") || "";
  // const [products, setProducts] = useState([]);
  // const [loading, setLoading] = useState(false);
  // const [error, setError] = useState(null);

  // useEffect(() => {
  //   if (!query) return; // Avoid fetching if there's no query

  //   setLoading(true);

  //   const loadProducts = async () => {
  //     const data = await fetchSearchProducts(query);
  //     setProducts(data);
  //     setLoading(false);
  //     setError(null);
  //   };
  //   loadProducts();
  // }, [query]);

  // const filteredProducts = products.filter((product) =>
  //   product.title.toLowerCase().includes(searchTerm)
  // );

  const [searchParams] = useSearchParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const searchQuery = searchParams.get("query") || "";

  {
    console.log(searchQuery);
  }

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const result = await fetchSearchProducts(searchQuery);
        console.log(result);
        setProducts(result);
        console.log(products);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
        setError(null);
      }
    };

    fetchProducts();
  }, [searchQuery]);

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4 pt-50 py-10">
        <h1 className="text-3xl font-semibold text-gray-800 text-center mb-6">
          Search Results
        </h1>
        <p className="text-lg text-center text-gray-600 mb-10">
          Results for:{" "}
          <span className="font-bold text-gray-900">{searchQuery}</span>
        </p>

        {loading && (
          <div className="flex justify-center items-center">
            <div className="w-16 h-16 border-4 border-[#1e3c72] border-t-transparent rounded-full animate-spin"></div>
          </div>
        )}
        {error && <p className="text-center text-red-500">{error}</p>}

        {products.length === 0 && !loading && !error && (
          <p className="text-center text-gray-500">
            No products found. Try another search.
          </p>
        )}

        <div className="bg-gray-50 min-h-screen">
          <div className="container mx-auto px-4 py-10">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
