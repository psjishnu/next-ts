import { Product } from "@/models";
import axios from "axios";
import { NextResponse } from "next/server";

// Example user data (you can replace this with a DB query later)
const users = [
  { id: 1, name: "Alice" },
  { id: 2, name: "Bob" },
];

export async function GET() {
  try {
    const products = await axios.get<{ products: Product[] }>(
      "https://dummyjson.com/products"
    );
    return NextResponse.json(products.data.products || []);
  } catch (e) {
    console.log(e);
    return NextResponse.json(users);
  }
}
