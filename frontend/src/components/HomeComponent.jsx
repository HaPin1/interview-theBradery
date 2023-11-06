import React, { useState, useEffect } from "react";
import axios from "axios";
import ProductItem from "./ProductItem"; // Assure-toi de créer le composant pour afficher un élément de produit

const HomeComponent = () => {
  const [products, setProducts] = useState([]);
  console.log("ouais");

  useEffect(() => {
    async function fetchProducts() {
      try {
        const response = await axios.get("http://localhost:3000/products");
        setProducts(response.data);
        console.log(response);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    }

    fetchProducts();
  }, []);

  return (
    <div>
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
