import axios from "axios";

export const useAddCart = async (userId, productId, quantity) => {
  try {
    const response = await axios.post(
      "http://localhost:3000/cart/add-to-cart",
      {
        userId,
        productId,
        quantity,
      }
    );
    return { isError: false, data: response.data };
  } catch (error) {
    return { isError: true, data: null };
  }
};

export const useFetchCart = async (token) => {
  try {
    const response = await axios.get(`http://localhost:3000/cart`);
    return { isError: false, data: response.data };
  } catch (error) {
    return { isError: true, data: null };
  }
};

export const useBuyCart = async (userId, token) => {
  try {
    const response = await axios.post(
      `http://localhost:3000/cart/buy/${userId}`
    );
    return { isError: false, data: response.data };
  } catch (error) {
    return { isError: true, data: null };
  }
};


