import axios from "axios";
// const Base_API = 'http://localhost/fashion/wp-json/wc/v3/products';
const Base_API = 'https://fakestoreapi.com/products';


// export const fetchProducts = async (page, perPage) => {
//   try {
//     const response = await axios.get(`${Base_API}?per_page=${perPage}&page=${page}`);
//     return {
//       products: response.data,
//       totalPages: Math.ceil(response.headers["x-wp-total"] / perPage),
//     };
//   }
//   catch (error) {
//     console.error("Error fetching products:", error);
//     throw new Error("Failed to fetch products");
//   }
// };

// src/api/products.js

export const fetchProducts = async (page, perPage) => {
  try {
    const response = await axios.get(Base_API);
    const allProducts = response.data;

    const start = (page - 1) * perPage;
    const end = start + perPage;
    const paginatedProducts = allProducts.slice(start, end);

    return {
      products: paginatedProducts,
      totalPages: Math.ceil(allProducts.length / perPage),
    };
  } catch (error) {
    console.error("Error fetching products:", error);
    throw new Error("Failed to fetch products");
  }
};


export const fetchSearchProducts = async (query) => {
  try {
    const response = await axios.get(Base_API);

    // Client-side filtering because the API doesn't support ?search=
    const filtered = response.data.filter((product) =>
      product.title.toLowerCase().includes(query.toLowerCase())
    );

    return filtered;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw new Error("Failed to fetch products");
  }
};


// export const fetchSearchProducts = async (query) => {

//   try {
//     const response = await axios.get(Base_API, {
//       params: {
//         search: query,
//       },
//     });
//     return response.data;
//   } catch (error) {
//     console.error("Error fetching products:", error);
//     throw new Error("Failed to fetch products");
//   }
// }

export const fetchCategory = async () => {
  try {
    const response = await axios.get(`${Base_API}/categories`,
      {
        params: {
          per_page: 100, // Fetch up to 100 categories
          page: 1, // Adjust as needed for multiple pages
        },
      }
    );
    return response;
  } catch (error) {
    console.error("Error fetching category:", error);
  }
}

// export const fetchProductsCategory = async (id) => {
//   try {
//     const response = await axios.get(
//       `${Base_API}?category=${id}`
//     );
//     return response;
//   } catch (error) {
//     console.error("Error fetching products:", error);
//   }
// }

export const fetchProductsCategory = async (category) => {
  try {
    const response = await axios.get(
      `${Base_API}/category/${category}`
    );
    return response;
  } catch (error) {
    console.error("Error fetching products:", error);
  }
}



export const fetchProductById = async (id) => {
  try {
    const response = await axios.get(`${Base_API}/${id}`);
    return response.data;
  }
  catch (error) {
    console.error("Error fetching products:", error);
  }
}

// export const fetchBestSellerProducts = async () => {
//   try {
//     const response = await axios.get(Base_API, {
//       params: {
//         orderby: 'popularity',
//         per_page: 4,
//       }
//     })
//     return response.data;
//   }
//   catch (error) {
//     console.error("Error fetching products:", error);
//   }
// }


// export const fetchRelatedProducts = async (productId) => {
//   try {
//     const response = await axios.get(`${Base_API}/${productId}/related`);
//     return response.data;
//   } catch (error) {
//     console.error("Error fetching related products:", error);
//     return [];
//   }
// };

