import React, { useState, useEffect } from "react";
import axios from "axios";

const CartComponent = () => {
  const [cartItems, setCartItems] = useState([]);

  /* useEffect(() => {
    async function fetchCart() {
      try {
        const response = await axios.get("http://localhost:3000/cart");
        setCartItems(response.data); // Met à jour l'état avec les données reçues
      } catch (error) {
        console.error("Error fetching cart items:", error);
      }
    }

    fetchCart();
  }, []); */

  return (
    <div>
      <h1>Cart</h1>
      <div style={{ display: "flex", flexWrap: "wrap" }}>
        {cartItems.map((item) => (
          <div key={item.id}>
            <p>{item.name}</p>
            <p>{item.price}</p>
            <p>Quantity: {item.quantity}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CartComponent;
