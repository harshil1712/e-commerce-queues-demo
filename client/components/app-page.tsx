'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

// This would typically be in a separate file
interface Product {
  id: number
  name: string
  price: number
  description: string
}

export function Page() {
  const [products, setProducts] = useState<Product[]>([])

  useEffect(() => {
    // In a real application, this would be an API call
    const fetchProducts = async () => {
      // Simulating API call
      const response = await fetch('/api/products')
      const data = await response.json()
      setProducts(data)
    }

    fetchProducts()
  }, [])

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
              <p>{product.description}</p>
              <p className="font-bold mt-2">${product.price.toFixed(2)}</p>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Link href={`/product/${product.id}`}>
                <Button variant="outline">View Details</Button>
              </Link>
              <Button>Add to Cart</Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}