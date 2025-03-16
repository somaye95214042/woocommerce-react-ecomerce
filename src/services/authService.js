import axios from "axios";

const API_URL = "http://localhost/fashion/wp-json/jwt-auth/v1/token";

export const loginUser = async (username, password) => {
  try {
    const response = await axios.post(API_URL, {
      username,
      password,
    });

    const { token, user_display_name } = response.data;

    // Save token to local storage
    localStorage.setItem("token", token);
    localStorage.setItem("user", user_display_name);

    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Login failed");
  }
};

export const logoutUser = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
};
