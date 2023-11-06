/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState, useEffect } from "react";
import { useFetchCart } from "../../hooks/useCart";
import {
  Card,
  CardContent,
  CircularProgress,
  Grid,
  Typography,
} from "@material-ui/core";

const CartComponent = () => {
  const [cartItems, setCartItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchCart = async () => {
      const { isError, data } = await useFetchCart();

      if (isError) {
        setError(true);
        setIsLoading(false);
        return;
      }
      setCartItems(data);
      setIsLoading(false);
    };

    fetchCart();
  }, []);

  return (
    <div>
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

      {!isLoading && cartItems && (
        <Grid container spacing={2}>
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
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </div>
  );
};

export default CartComponent;
