import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { fetchProductById } from "../utils/WooCommerceApi";
import { fetchRelatedProducts } from "../utils/WooCommerceApi";
import { useCart } from "../Context/CartContext";

const ProductPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const stripHtmlTags = (html) => {
    return html.replace(/<\/?[^>]+(>|$)/g, ""); // Removes all HTML tags
  };

  useEffect(() => {
    const loadProductById = async () => {
      const data = await fetchProductById(id);
      setProduct(data);
    };
    loadProductById();
  }, [id]);

  useEffect(() => {
    const loadRelatedProducts = async () => {
      const data = await fetchRelatedProducts(id);
      setRelatedProducts(data);
      setLoading(false);
    };
    loadRelatedProducts();
  }, [id]);

  const handleQuantityChange = (amount) => {
    if (quantity + amount > 0) {
      setQuantity(quantity + amount);
    }
  };

  const handleAddToCart = () => {
    addToCart(product, quantity);
  };

  if (!product)
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="w-16 h-16 border-4 border-[#1e3c72] border-t-transparent rounded-full animate-spin"></div>
      </div>
    );

  let cleanDescription = stripHtmlTags(product.description);
  if (cleanDescription.length > 400) {
    cleanDescription = cleanDescription.substring(0, 400) + "...";
  }

  return (
    <div className="bg-gray-100 flex flex-col items-center justify-center min-h-screen p-6">
      <div className="max-w-5xl w-full bg-white shadow-lg rounded-lg overflow-hidden md:flex mt-20">
        {/* Product Image */}
        <div className="md:w-1/2 flex items-center justify-center bg-gray-100">
          <img
            src={product.images[0]?.src}
            alt={product.name}
            className="w-full h-auto object-cover rounded-lg"
          />
        </div>

        {/* Product Details */}
        <div className="p-8 md:w-1/2 flex flex-col justify-center">
          <h2 className="text-3xl font-bold text-gray-900">{product.name}</h2>
          <p className="text-gray-700 mt-4 leading-relaxed">
            {cleanDescription}
          </p>
          <p className="text-2xl font-semibold text-[#1e3c72] mt-5">
            ${product.price}
          </p>

          {/* Quantity Selector & Add to Cart (SIDE BY SIDE) */}
          <div className="flex items-center mt-6 space-x-4">
            {/* Quantity Buttons */}
            <div className="flex items-center border border-gray-300 rounded-lg">
              <button
                onClick={() => handleQuantityChange(-1)}
                className="bg-gray-300 text-gray-700 px-4 py-2 rounded-l-md hover:bg-gray-400 transition"
              >
                −
              </button>
              <span className="px-6 text-lg font-semibold">{quantity}</span>
              <button
                onClick={() => handleQuantityChange(+1)}
                className="bg-gray-300 text-gray-700 px-4 py-2 rounded-r-md hover:bg-gray-400 transition"
              >
                +
              </button>
            </div>

            {/* Add to Cart Button */}
            <button
              onClick={handleAddToCart}
              className="bg-[#1e3c72] text-white px-6 py-3 rounded-lg font-semibold text-lg hover:bg-[#162b54] transition"
            >
              Add to Cart
            </button>
          </div>

          <div className="mt-10">
            <strong className="text-gray-700">Category:</strong>
            {product.categories.map((category) => (
              <Link
                key={category.id}
                to={`/product-category/${category.slug}`}
                className="ml-2 text-[#1e3c72] hover:underline"
              >
                {category.name}
              </Link>
            ))}
          </div>
        </div>
      </div>
      {loading ? (
        <div className="mt-16">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">
            Related Products
          </h2>
        </div>
      ) : (
        <div className="mt-16">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">
            Related Products
          </h2>
          {relatedProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
              {relatedProducts.map((related) => (
                <ProductCard key={related.id} product={related} />
              ))}
            </div>
          ) : (
            <p className="text-gray-500">No related products found.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default ProductPage;
