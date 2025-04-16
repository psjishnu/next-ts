"use client";

import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Grid,
  Rating,
  Typography,
} from "@mui/material";
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";
import styled from "styled-components";

type Product = {
  id: number;
  title: string;
  description: string;
  price: number;
  rating: number;
  thumbnail: string;
};

const PageWrapper = styled(Box)`
  max-width: 1200px;
  margin: auto;
  padding: 32px 16px;
`;

const StyledCard = styled(Card)`
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const StyledMedia = styled(CardMedia)<{ component: string; alt: string }>`
  height: 120px;
  object-fit: contain;
  padding: 8px;
`;

export default function ProductListPage() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    axios
      .get("/api/v1/products")
      .then((res) => setProducts(res.data))
      .catch((err) => console.log(err));
  }, []);
  return (
    <PageWrapper>
      <Typography variant="h5" gutterBottom>
        Products
      </Typography>

      <Grid container spacing={2}>
        {products.map((product) => (
          <Grid item xs={6} sm={4} md={3} key={product.id}>
            <Link href={`/product/${product.id}`} passHref>
              <CardActionArea>
                <StyledCard>
                  <StyledMedia
                    component="img"
                    image={product.thumbnail}
                    alt={product.title}
                  />
                  <CardContent sx={{ padding: "8px" }}>
                    <Typography variant="subtitle1" fontSize={14} noWrap>
                      {product.title}
                    </Typography>
                    <Typography variant="caption" color="text.secondary" noWrap>
                      ${product.price.toFixed(2)}
                    </Typography>
                    <Box mt={0.5}>
                      <Rating
                        value={product.rating}
                        precision={0.1}
                        readOnly
                        size="small"
                      />
                    </Box>
                  </CardContent>
                </StyledCard>
              </CardActionArea>
            </Link>
          </Grid>
        ))}
      </Grid>
    </PageWrapper>
  );
}
