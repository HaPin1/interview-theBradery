/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState, useEffect } from "react";
import {
  useBuyCart,
  useDeleteFromCart,
  useFetchCart,
} from "../../hooks/useCart";
import {
  Button,
  Card,
  CardContent,
  CircularProgress,
  Grid,
  Typography,
} from "@material-ui/core";
import { useSelector } from "react-redux";
import ToastNotification from "../ToastNotifiaction";

const CartComponent = () => {
  const token = useSelector((state) => state.jwt);
  const [cartItems, setCartItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  const [openToast, setOpenToast] = useState(false);
  const [message, setMessage] = useState("");
  const [severity, setSeverity] = useState("success");

  const handleOpen = (msg, severityType) => {
    setMessage(msg);
    setSeverity(severityType);
    setOpenToast(true);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenToast(false);
  };

  const fetchCart = async () => {
    const { isError, data } = await useFetchCart(token);

    if (isError) {
      setError(true);
      setIsLoading(false);
      return;
    }
    setCartItems(data);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchCart();
  });

  const handleBuyCart = async () => {
    const { isError, data } = await useBuyCart(token);

    if (!isError) {
      fetchCart();
      handleOpen(data, "success");
      return;
    }

    handleOpen(data, "error");
  };

  const handleDeleteFromCart = async (productId) => {
    const { isError, data } = await useDeleteFromCart(token, productId);

    if (!isError) {
      fetchCart();
      handleOpen(data, "success");
      return;
    }

    handleOpen(data, "error");
  };

  return (
    <div className="mainDiv">
      <ToastNotification
        open={openToast}
        message={message}
        severity={severity}
        handleClose={handleClose}
      />
      <h1>Cart</h1>
      {isLoading && (
        <div style={{ textAlign: "center", marginTop: 20 }}>
          <CircularProgress />
        </div>
      )}
      {error && (
        <div style={{ textAlign: "center", marginTop: 20 }}>
          <p>An error occured while fetching data ...</p>
          <p>Refresh page</p>
        </div>
      )}

      {!isLoading && cartItems.length !== 0 && (
        <Grid container spacing={2} style={{ margin: "1rem" }}>
          {cartItems.map((item) => (
            <Grid item xs={12} key={item.product.id}>
              <Card>
                <CardContent>
                  <Typography variant="h6">{item.product.name}</Typography>
                  <Typography>
                    Total Price:{" "}
                    {Number((item.product.price * item.quantity).toFixed(2))} $
                  </Typography>
                  <Typography>Quantity: {item.quantity}</Typography>
                </CardContent>
                <CardContent>
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => handleDeleteFromCart(item.product.id)}
                  >
                    Supprimer
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}

      {!isLoading && cartItems.length !== 0 && (
        <Button variant="contained" color="primary" onClick={handleBuyCart}>
          Buy Cart
        </Button>
      )}

      {!isLoading && cartItems.length === 0 && (
        <Typography variant="h3">No items in cart</Typography>
      )}
    </div>
  );
};

export default CartComponent;
