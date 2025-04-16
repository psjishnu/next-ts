import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  // Example logic – you could fetch from a database or mock data here

  try {
    const { id } = await params;
    const products = await axios.get(`https://dummyjson.com/product/${id}`);
    return NextResponse.json(products.data || {});
  } catch (e) {
    console.log(e);
    return NextResponse.json({});
  }
}
