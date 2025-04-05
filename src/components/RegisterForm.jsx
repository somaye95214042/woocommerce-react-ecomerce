import { useState } from "react";
import { useNavigate } from "react-router-dom";

const RegisterForm = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const response = await fetch(
        // "http://localhost/fashion/wp-json/wp/v2/users",
        "https://fakestoreapi.com/users",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            // Authorization:
            //   "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOi8vbG9jYWxob3N0L2Zhc2hpb24iLCJpYXQiOjE3NDIwNDE2NTgsIm5iZiI6MTc0MjA0MTY1OCwiZXhwIjoxNzQyNjQ2NDU4LCJkYXRhIjp7InVzZXIiOnsiaWQiOiIxIn19fQ.wfIRnA_akIk1vlfDxkM_j6D8yvBJ01xloThtun3Akms",
          },
          body: JSON.stringify(formData),
        }
      );

      const data = await response.json();

      if (response.ok) {
        setMessage("✅ Registration successful! Please log in.");
        alert("✅ Registration successful! Please log in.");
        setFormData({ username: "", email: "", password: "" });
        navigate("/login");
      } else {
        setMessage(`❌ Error: ${data.message}`);
      }
    } catch (error) {
      setMessage("❌ Something went wrong.");
    }

    setLoading(false);
  };

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-lg pt-50">
      <h2 className="text-2xl font-bold mb-4 text-center">Register</h2>

      {message && <p className="mb-4 text-center text-red-500">{message}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={formData.username}
          onChange={handleChange}
          required
          className="w-full p-3 border rounded-md"
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
          className="w-full p-3 border rounded-md"
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
          className="w-full p-3 border rounded-md"
        />

        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-3 rounded-md hover:bg-blue-600 transition"
          disabled={loading}
        >
          {loading ? "Registering..." : "Register"}
        </button>
      </form>
    </div>
  );
};

export default RegisterForm;
