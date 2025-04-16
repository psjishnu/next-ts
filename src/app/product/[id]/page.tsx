"use client";

import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Chip,
  Divider,
  Rating,
  Stack,
  Typography,
} from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import styled from "styled-components";

const PageWrapper = styled(Box)`
  max-width: 1000px;
  margin: auto;
  padding: 32px 16px;
`;

const InfoRow = styled(Box)`
  display: flex;
  gap: 32px;
  flex-direction: column;

  @media (min-width: 768px) {
    flex-direction: row;
  }
`;

const StyledCardMedia = styled(CardMedia)<{ component: string; alt: string }>`
  border-radius: 8px;
  object-fit: contain;
  height: 300px;
  width: 300px;
`;

type Product = {
  id: number;
  title: string;
  description: string;
  price: number;
  thumbnail: string;
  availabilityStatus: string;
  rating: number;
  sku: string;
  brand: string;
  stock: number;
  tags: string[];
  warrantyInformation: string;
  shippingInformation: string;
  returnPolicy: string;
  minimumOrderQuantity: number;
  dimensions: {
    width: number;
    height: number;
    depth: number;
  };
  reviews: {
    reviewerName: string;
    comment: string;
    rating: number;
    date: string;
  }[];
};

type Props = {
  params: {
    id: string;
  };
};

export default function ProductPage({ params }: Props) {
  const { id } = params;

  const [product, setProduct] = useState<Product | null>(null);

  useEffect(() => {
    axios
      .get(`/api/v1/products/${id}`)
      .then((res) => setProduct(res.data))
      .catch((err) => console.error(err));
  }, [id]);

  if (!product) {
    return <Typography align="center">Loading product...</Typography>;
  }

  return (
    <PageWrapper>
      <InfoRow>
        <Card>
          <StyledCardMedia
            component="img"
            src={product.thumbnail}
            alt={product.title}
          />
        </Card>

        <Box flex={1}>
          <Typography variant="h4" gutterBottom>
            {product.title}
          </Typography>
          <Typography variant="body1" color="text.secondary" gutterBottom>
            {product.description}
          </Typography>

          <Typography variant="h6" color="primary">
            ${product.price.toFixed(2)}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {product.availabilityStatus}
          </Typography>

          <Stack direction="row" alignItems="center" spacing={1} mt={1}>
            <Rating value={product.rating} precision={0.1} readOnly />
            <Typography variant="caption">({product.rating})</Typography>
          </Stack>

          <Box mt={2}>
            <Typography variant="body2">SKU: {product.sku}</Typography>
            <Typography variant="body2">Brand: {product.brand}</Typography>
            <Typography variant="body2">Stock: {product.stock}</Typography>
          </Box>

          <Box mt={2}>
            {product.tags.map((tag) => (
              <Chip key={tag} label={tag} size="small" sx={{ mr: 1 }} />
            ))}
          </Box>
        </Box>
      </InfoRow>

      <Divider sx={{ my: 4 }} />

      <Box>
        <Typography variant="h6">Product Info</Typography>
        <Typography variant="body2">
          Warranty: {product.warrantyInformation}
        </Typography>
        <Typography variant="body2">
          Shipping: {product.shippingInformation}
        </Typography>
        <Typography variant="body2">
          Return Policy: {product.returnPolicy}
        </Typography>
        <Typography variant="body2">
          Min Order Qty: {product.minimumOrderQuantity}
        </Typography>
        <Typography variant="body2">
          Dimensions: {product.dimensions.width}W x {product.dimensions.height}H
          x {product.dimensions.depth}D cm
        </Typography>
      </Box>

      <Divider sx={{ my: 4 }} />

      <Box>
        <Typography variant="h6" gutterBottom>
          Reviews
        </Typography>
        {product.reviews.map((review, idx) => (
          <Card key={idx} variant="outlined" sx={{ mb: 2 }}>
            <CardContent>
              <Stack direction="row" justifyContent="space-between">
                <Typography fontWeight={600}>{review.reviewerName}</Typography>
                <Rating value={review.rating} readOnly size="small" />
              </Stack>
              <Typography variant="body2" color="text.secondary" mt={1}>
                {review.comment}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                {new Date(review.date).toLocaleDateString()}
              </Typography>
            </CardContent>
          </Card>
        ))}
      </Box>
    </PageWrapper>
  );
}
