import React from "react";
import { Card, CardContent, Typography, Button } from "@material-ui/core";
import { useNavigate } from "react-router-dom";

const ProductItem = ({ product }) => {
  const { id, name, price, inventory } = product;
  const navigate = useNavigate();

  const onViewMore = () => {
    navigate(`/product/${id}`, { replace: true });
  };

  return (
    <Card
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <CardContent>
        <Typography variant="h5" component="h2" style={{ textAlign: "center" }}>
          {name}
        </Typography>
        <Typography color="textSecondary" style={{ textAlign: "center" }}>
          ID: {id}
        </Typography>
        <Typography
          variant="body2"
          component="p"
          style={{ textAlign: "center" }}
        >
          Price: {price}
        </Typography>
        <Typography
          variant="body2"
          component="p"
          style={{ textAlign: "center" }}
        >
          Inventory: {inventory}
        </Typography>
      </CardContent>
      <Button onClick={onViewMore} style={{marginBottom: '10px'}}>View More</Button>
    </Card>
  );
};

export default ProductItem;
