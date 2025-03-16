import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import { fetchCategory, fetchProductsCategory } from "../utils/WooCommerceApi";

const CategoryPage = () => {
  const { slug } = useParams();
  const [products, setProducts] = useState([]);
  const [categoryId, setCategoryId] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadCategory = async () => {
      const response = await fetchCategory();
      console.log(response);
      const category = response.data.find((cat) => cat.slug === slug);
      if (category) {
        setCategoryId(category.id);
      }
    };

    loadCategory();
  }, [slug]);

  console.log(categoryId);

  useEffect(() => {
    if (!categoryId) return;

    const loadProductsCategory = async () => {
      const response = await fetchProductsCategory(categoryId);
      setProducts(response.data);
      setLoading(false);
    };
    loadProductsCategory();
  }, [categoryId]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="w-16 h-16 border-4 border-[#1e3c72] border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div>
      <h2>Products in {slug}</h2>
      {products.length === 0 ? (
        <p>No products found in this category.</p>
      ) : (
        <div className="bg-gray-50 min-h-screen">
          <div className="container mx-auto px-4 py-10 pt-40">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CategoryPage;
