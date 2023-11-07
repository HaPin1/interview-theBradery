import axios from "axios";

export const useAddCart = async (token, productId, quantity) => {
  try {
    const response = await axios.post(
      `${process.env.REACT_APP_BASE_URL}/cart/add-to-cart`,
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
    return { isError: true, data: error };
  }
};

export const useDeleteFromCart = async (token, productId) => {
  try {
    const response = await axios.post(
      `${process.env.REACT_APP_BASE_URL}/cart/remove-from-cart`,
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
    return { isError: true, data: error };
  }
};

export const useFetchCart = async (token) => {
  try {
    const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/cart`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return { isError: false, data: response.data };
  } catch (error) {
    return { isError: true, data: error };
  }
};

export const useBuyCart = async (token) => {
  try {
    const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/cart/buy`, null, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return { isError: false, data: response.data };
  } catch (error) {
    return { isError: true, data: error };
  }
};
