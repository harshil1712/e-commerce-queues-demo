"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/app/context/AuthContext";

export default function Navigation() {
  const { isLoggedIn, logout } = useAuth();
  return (
    <nav className="bg-gray-800 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-xl font-bold">
          E-Commerce Demo
        </Link>
        <div className="space-x-4 text-gray-800">
          <Link href="/cart">
            <Button variant="outline">Cart</Button>
          </Link>
          {isLoggedIn ? (
            <Button variant="outline" onClick={logout}>
              Logout
            </Button>
          ) : (
            <>
              <Link href="/login">
                <Button variant="outline">Login</Button>
              </Link>
              <Link href="/signup">
                <Button variant="outline">Signup</Button>
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
