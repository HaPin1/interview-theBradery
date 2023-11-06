import axios from "axios";

export const useAddCart = async (token, productId, quantity) => {
  try {
    const response = await axios.post(
      "http://localhost:3000/cart/add-to-cart",
      {
        productId,
        quantity,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return { isError: false, data: response.data };
  } catch (error) {
    return { isError: true, data: null };
  }
};

export const useDeleteFromCart = async (token, productId) => {
  try {
    const response = await axios.post(
      "http://localhost:3000/cart/remove-from-cart",
      {
        productId,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return { isError: false, data: response.data };
  } catch (error) {
    return { isError: true, data: null };
  }
};

export const useFetchCart = async (token) => {
  try {
    const response = await axios.get(`http://localhost:3000/cart`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return { isError: false, data: response.data };
  } catch (error) {
    return { isError: true, data: null };
  }
};

export const useBuyCart = async (token) => {
  try {
    const response = await axios.post("http://localhost:3000/cart/buy", null, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return { isError: false, data: response.data };
  } catch (error) {
    return { isError: true, data: null };
  }
};
