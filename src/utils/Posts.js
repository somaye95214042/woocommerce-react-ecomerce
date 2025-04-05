import axios from "axios";
// const Base_API = "http://localhost/fashion/wp-json/wp/v2/posts";
const Base_API = "https://jsonplaceholder.typicode.com/posts";


// export const fetchPosts = async () => {
//     const response = await axios.get(`${Base_API}?_embed`);
//     return response;
// };

export const fetchPosts = async () => {
    const response = await axios.get(`${Base_API}`);
    return response;
};

export const fetchPostById = async (id) => {
    // const response = await axios.get(`${Base_API}/${id}?_embed`);
    const response = await axios.get(`${Base_API}/${id}`);
    return response.data;
  }