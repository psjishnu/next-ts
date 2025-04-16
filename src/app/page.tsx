"use client";
import ProductTile from "@/components/ProductTile";
import { Product } from "@/models";
import axios from "axios";
import { useEffect, useState } from "react";
import styled from "styled-components";

const Main = styled.div`
  display: grid;
  gap: 1rem;
  grid-template-columns: repeat(auto-fill, minmax(min(250px, 100%), 1fr));
`;

const Home = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    axios
      .get<Product[]>("/api/v1/products")
      .then((res) => {
        setProducts(res.data);
      })
      .catch((err) => {
        console.error("Error fetching products:", err);
      });
  }, []);

  return (
    <Main>
      {products.map((product) => (
        <ProductTile
          key={product.id}
          product={{
            thumbnail: product.thumbnail,
            title: product.title,
            id: product.id,
          }}
        />
      ))}
    </Main>
  );
};

export default Home;
