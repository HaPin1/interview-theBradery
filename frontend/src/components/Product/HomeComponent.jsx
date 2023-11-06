/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState, useEffect } from "react";
import { useFetchAll } from "../../hooks/useApi";
import { useSelector } from "react-redux";
import ProductItem from "./ProductItem";
import { CircularProgress } from "@material-ui/core";

const HomeComponent = () => {
  const token = useSelector((state) => state.jwt);
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      const { isError, data } = await useFetchAll();

      if (isError) {
        setError(true);
        setIsLoading(false);
        return;
      }
      setProducts(data);
      setIsLoading(false);
    };

    fetchProducts();
  }, [token]);

  return (
    <div style={{ padding: "1rem" }}>
      <h1>Products</h1>
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
      {!isLoading && products && (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(5, 1fr)",
            gap: "20px",
          }}
        >
          {products.map((product) => (
            <ProductItem key={product.id} product={product} />
          ))}
        </div>
      )}
      {!isLoading && products.length === 0 && (
        <div style={{ padding: "1rem" }}>
          <h1>Products</h1>
          <div>
            <h1>No products available yet ...</h1>
          </div>
        </div>
      )}
    </div>
  );
};

export default HomeComponent;
