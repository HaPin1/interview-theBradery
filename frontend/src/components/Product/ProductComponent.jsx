/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState, useEffect } from "react";
import axios from "axios";
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

const useStyles = makeStyles((theme) => ({
  select: {
    width: 120,
    margin: theme.spacing(1),
  },
}));

const ProductDetail = () => {
  const { productId } = useParams();
  const classes = useStyles();
  const [product, setProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);
  const [quantity, setQuantity] = useState(1);

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
  }, []);

  const handleAddToCart = () => {
    console.log(`Ajout de ${quantity} unités de ${product.name} au panier`);
  };

  return (
    <>
      {isLoading && (
        <div style={{ textAlign: "center", marginTop: 20 }}>
          <CircularProgress />
        </div>
      )}
      {!isLoading && product && (
        <div>
          <Typography variant="h4" gutterBottom>
            {product.name}
          </Typography>
          <Typography variant="subtitle1">Price: {product.price}</Typography>
          <Typography variant="body1">
            Inventory: {product.inventory}
          </Typography>
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
          <Button variant="contained" color="primary" onClick={handleAddToCart}>
            Ajouter au panier
          </Button>
        </div>
      )}
    </>
  );
};

export default ProductDetail;
