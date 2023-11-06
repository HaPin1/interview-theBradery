/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  Button,
  CircularProgress,
  MenuItem,
  Select,
  Typography,
  makeStyles,
} from "@material-ui/core";
import { useFetchId } from "../../hooks/useApi";
import { useSelector } from "react-redux";
import { useAddCart } from "../../hooks/useCart";
import ToastNotification from "../ToastNotifiaction";

const useStyles = makeStyles((theme) => ({
  select: {
    width: 120,
    margin: theme.spacing(1),
  },
}));

const ProductDetail = () => {
  const { productId } = useParams();
  const token = useSelector((state) => state.jwt);
  const classes = useStyles();

  const [product, setProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);
  const [quantity, setQuantity] = useState(1);

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

  useEffect(() => {
    const fetchProduct = async () => {
      const { isError, data } = await useFetchId(productId);

      if (isError) {
        setError(true);
        setIsLoading(false);
        return;
      }
      setProduct(data);
      setIsLoading(false);
    };

    fetchProduct();
  }, [productId]);

  const handleAddToCart = async () => {
    const { isError, data } = await useAddCart(token, product.id, quantity);
    console.log(isError, data);
    if (isError) {
      handleOpen(data, "error");
      return;
    }
    handleOpen(data, "success");
  };

  return (
    <>
      <ToastNotification
        open={openToast}
        message={message}
        severity={severity}
        handleClose={handleClose}
      />
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
      {!isLoading && product && (
        <div
          className="mainDiv"
        >
          <Typography variant="h4" gutterBottom>
            {product.name}
          </Typography>
          <Typography variant="h6">Price: {product.price}</Typography>
          <Typography variant="body1">
            Inventory: {product.inventory}
          </Typography>
          {product.inventory > 0 ? (
            <Select
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              className={classes.select}
            >
              {[...Array(product.inventory).keys()].map((val) => (
                <MenuItem key={val + 1} value={val + 1}>
                  {val + 1}
                </MenuItem>
              ))}
            </Select>
          ) : (
            <Typography variant="body1">No stock</Typography>
          )}

          {product.inventory > 0 ? (
            <Button
              variant="contained"
              color="primary"
              onClick={handleAddToCart}
            >
              Ajouter au panier
            </Button>
          ) : null}
        </div>
      )}
    </>
  );
};

export default ProductDetail;
