import React, { useContext, useEffect } from "react";
import { Container, Grid } from "@mui/material";
import ProductCard from "../components/ProductCard";
import { ClientContext } from "../contexts/ClientProvider";
import FiltersBlock from "../components/FiltersBlock";
import ProductsPagination from "../components/ProductsPagination";

const MainPage = () => {
  const { getProducts, products } = useContext(ClientContext);
  useEffect(() => {
    getProducts();
  }, []);

  if (!products) {
    return <h2>Loading...</h2>;
  }

  return (
    <div>
      <Container>
        <h2>Main page</h2>
        <FiltersBlock />
        <Grid container spacing={4}>
          {products.map((item) => (
            <Grid xs={12} sm={6} md={4} item key={item.id}>
              <ProductCard item={item} />
            </Grid>
          ))}
        </Grid>
        <ProductsPagination />
      </Container>
    </div>
  );
};

export default MainPage;
