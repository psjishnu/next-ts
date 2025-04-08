"use client";
import ProductTile from "@/components/ProductTile";
import axios from "axios";
import { useEffect, useState } from "react";
import styled from "styled-components";

const Main = styled.div`
  display: grid;
  gap: 1rem;
  grid-template-columns: repeat(auto-fill, minmax(min(250px, 100%), 1fr));
`;

const Home = () => {
  // Use the Product type to type the state
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios
      .get("https://dummyjson.com/products")
      .then((res) => {
        setProducts(res.data.products); // Assuming the API response contains a `products` array
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <Main>
      {products.map((product) => (
        <ProductTile key={product.id} product={product} />
      ))}
    </Main>
  );
};

export default Home;
