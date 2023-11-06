/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState, useEffect } from "react";
import axios from "axios";
import ProductItem from "./ProductItem"; // Assure-toi de créer le composant pour afficher un élément de produit
import { useFetchAll } from "../../hooks/useApi";
import { useSelector } from "react-redux";

const HomeComponent = () => {
  const token = useSelector(state => state.jwt);
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      const { isError, data } = await useFetchAll(token);

      if (isError) {
        setError(true);
        setIsLoading(false);
        return;
      }
      setProducts(data);
      setIsLoading(false);
    };

    fetchProducts();
  }, []);

  return (
    <div style={{ padding: "1rem" }}>
      <h1>Products</h1>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(5, 1fr)", // 5 items par ligne
          gap: "20px",
        }}
      >
        {products.map((product) => (
          <ProductItem key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default HomeComponent;
