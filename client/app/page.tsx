"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useAuth } from "./context/AuthContext";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface Product {
  id: number;
  name: string;
  cost: number;
  desc: string;
  quantity?: number;
}

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [cart, setCart] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const { isLoggedIn, logout } = useAuth();

  // Update the URL for deployment
  const apiUrl = "http://localhost:8787";

  useEffect(() => {
    fetchProducts();
    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await fetch(`${apiUrl}/api/products`);
      const data = (await response.json()) as Product[];
      setProducts(data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching products:", error);
      setLoading(false);
    }
  };

  const addToCart = (product: Product) => {
    const existingProductIndex = cart.findIndex(
      (item) => item.id === product.id
    );

    let updatedCart: Product[];

    if (existingProductIndex !== -1) {
      // Product already exists in cart, update quantity
      updatedCart = [...cart];
      updatedCart[existingProductIndex] = {
        ...updatedCart[existingProductIndex],
        quantity: (updatedCart[existingProductIndex].quantity || 1) + 1,
      };
    } else {
      // New product, add to cart with quantity 1
      updatedCart = [...cart, { ...product, quantity: 1 }];
    }

    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };
  if (loading) {
    return <div>Loading products...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Our Products</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <Card key={product.id}>
            <CardHeader>
              <CardTitle>{product.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <p>{product.desc}</p>
              <p className="font-bold mt-2">${product.cost.toFixed(2)}</p>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Link href={`#`}>
                <Button variant="outline">View Details</Button>
              </Link>
              <Button onClick={() => addToCart(product)}>Add to Cart</Button>
            </CardFooter>
          </Card>
        ))}
        {/* <Link href="/cart" className="block mt-4 text-blue-500">
        View Cart ({cart.length})
      </Link> */}
      </div>
    </div>
  );
}
