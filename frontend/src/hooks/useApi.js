import axios from "axios";

export const useFetchAll = async () => {
  try {
    const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/products`);
    return { isError: false, data: response.data };
  } catch (error) {
    return { isError: false, data: null };
  }
};

export const useFetchId = async (productId) => {
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_BASE_URL}/products/${productId}`
    );
    return { isError: false, data: await response.data };
  } catch (error) {
    return { isError: false, data: null };
  }
};
