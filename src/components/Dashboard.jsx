import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    const username = localStorage.getItem("user");

    if (!token) {
      navigate("/login"); // Redirect if no token
    } else {
      setUser(username);
    }
  }, [navigate]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-3xl font-bold">Welcome, {user}!</h1>
      <p className="text-gray-600 mt-2">You are now logged in.</p>
    </div>
  );
};

export default Dashboard;
