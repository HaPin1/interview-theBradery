import React from "react";
import { Card, CardContent, Typography, Button } from "@material-ui/core";

const ProductItem = ({ product }) => {
  const { id, name, price, inventory } = product;

  return (
    <Card>
      <CardContent>
        <Typography variant="h5" component="h2">
          {name}
        </Typography>
        <Typography color="textSecondary">ID: {id}</Typography>
        <Typography variant="body2" component="p">
          Price: {price}
        </Typography>
        <Typography variant="body2" component="p">
          Inventory: {inventory}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default ProductItem;
