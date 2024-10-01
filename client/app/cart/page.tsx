"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

interface Product {
  id: number;
  name: string;
  cost: number;
  quantity: number;
  error?: Error;
}

export default function Cart() {
  const [cart, setCart] = useState<Product[]>([]);

  // Update the URL for deployment
  const apiUrl = "http://localhost:8787";

  useEffect(() => {
    // Load cart from localStorage
    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
  }, []);

  const updateCart = (updatedCart: Product[]) => {
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const removeFromCart = (productId: number) => {
    const updatedCart = cart
      .map((item) => {
        if (item.id === productId) {
          return { ...item, quantity: item.quantity - 1 };
        }
        return item;
      })
      .filter((item) => item.quantity > 0);
    updateCart(updatedCart);
  };

  const addToCart = (productId: number) => {
    const updatedCart = cart.map((item) => {
      if (item.id === productId) {
        return { ...item, quantity: item.quantity + 1 };
      }
      return item;
    });
    updateCart(updatedCart);
  };

  const placeOrder = async () => {
    const orderData = cart.map((item) => ({
      productId: item.id,
      quantity: item.quantity,
    }));

    const res = await fetch(`${apiUrl}/api/order`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId: 1, order: orderData, time: Date.now() }),
    });
    const result = (await res.json()) as { message: string; status: number };
    if (result.status === 500) {
      alert(result.message);
      return;
    }
    updateCart([]);
    alert("Order placed successfully!");
  };

  const calculateTotal = () => {
    return cart
      .reduce((total, item) => total + item.cost * item.quantity, 0)
      .toFixed(2);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Your Cart</h1>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          {cart.map((product) => (
            <div
              key={product.id}
              className="flex justify-between items-center mb-4"
            >
              <span>{product.name}</span>
              <span>${product.cost.toFixed(2)}</span>
              <div className="flex items-center">
                <button
                  onClick={() => removeFromCart(product.id)}
                  className="bg-red-500 text-white px-2 py-1 rounded mr-2"
                >
                  -
                </button>
                <span className="mx-2">{product.quantity}</span>
                <button
                  onClick={() => addToCart(product.id)}
                  className="bg-green-500 text-white px-2 py-1 rounded ml-2"
                >
                  +
                </button>
              </div>
            </div>
          ))}
          <div className="text-xl font-bold mt-6">
            Total: ${calculateTotal()}
          </div>
          <Button
            onClick={placeOrder}
            className="bg-blue-500 text-white px-4 py-2 rounded mt-4 w-full"
          >
            Place Order
          </Button>
        </>
      )}
      <Link href="/" className="block mt-4 text-blue-500">
        Continue Shopping
      </Link>
    </div>
  );
}
