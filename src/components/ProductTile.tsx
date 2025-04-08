import { Card } from "@mui/material";
import Link from "next/link";
import { FC } from "react";
import styled from "styled-components";

const Main = styled(Card)`
  cursor: pointer;
  width: 100%;
  max-width: 300px; /* Max width for the card */
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1); /* Soft shadow */
  display: flex;
  flex-direction: column;
  align-items: center;
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-5px); /* Lift effect on hover */
  }
`;

interface ImageDivProps {
  image: string;
}

const ImageDiv = styled.div<ImageDivProps>`
  background-image: ${({ image }) => `url(${image})`};
  aspect-ratio: 1/1; /* Ensures a square aspect ratio */
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
  width: 100%;
  max-height: 200px; /* Maximum height for the image */
  border-radius: 8px;
  margin-bottom: 16px; /* Space between image and title */
`;

const Title = styled.p`
  font-size: 16px;
  font-weight: bold;
  color: #333;
  margin: 0;
  text-align: center;
  line-height: 1.4;
`;

interface Product {
  thumbnail: string;
  title: string;
  d: false;
  id: number;
}

interface ProductTileProps {
  product?: Product;
}

const ProductTile: FC<ProductTileProps> = ({
  product = { thumbnail: "", title: "", id: 0 },
}) => {
  // Default values if product is undefined
  const { thumbnail = "", title = "Untitled", id } = product;

  return (
    <Link href={`/product/${id}`}>
      <Main>
        <ImageDiv image={thumbnail} />
        <Title>{title}</Title>
      </Main>
    </Link>
  );
};

export default ProductTile;
