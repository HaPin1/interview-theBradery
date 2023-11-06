import axios from "axios";

export const useFetchAll = async (token) => {
  try {
    const response = await axios.get("http://localhost:3000/products", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return { isError: false, data: response.data };
  } catch (error) {
    return { isError: false, data: null };
  }
};

export const useFetchId = async (productId, token) => {
  try {
    const response = await axios.get(
      `http://localhost:3000/products/${productId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return { isError: false, data: await response.data };
  } catch (error) {
    return { isError: false, data: null };
  }
};
