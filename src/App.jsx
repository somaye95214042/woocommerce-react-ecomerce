import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import ShopPage from "./pages/ShopPage";
import ProductPage from "./pages/ProductPage";
import CartPage from "./pages/CartPage";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import AuthGuard from "./components/AuthGuard";
import SearchResults from "./pages/SearchResults";
import CategoryPage from "./pages/CategoryPage";
import { CartProvider } from "./Context/CartContext";
import HomePage from "./pages/HomePage";
import BlogPage from "./pages/BlogPage";
import PostPage from "./pages/PostPage";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import RegisterForm from "./components/RegisterForm";

function App() {
  return (
    <CartProvider>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/shop" element={<ShopPage />} />
          <Route path="/product/:id" element={<ProductPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/search" element={<SearchResults />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/post/:id" element={<PostPage />} />
          <Route path="/product-category/:slug" element={<CategoryPage />} />
          {/* Public Route: Anyone can access login */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<RegisterForm />} />

          {/* Protected Route: Only logged-in users can access */}
          <Route
            path="/dashboard"
            element={
              <AuthGuard>
                <Dashboard />
              </AuthGuard>
            }
          />
        </Routes>
      </Router>
    </CartProvider>
  );
}

export default App;
