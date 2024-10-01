"use client";

import React, { createContext, useState, useContext, useEffect } from "react";

interface AuthContextType {
  isLoggedIn: boolean;
  login: (email: string, password: string) => void;
  logout: () => void;
  signup: (email: string, password: string) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Update the URL for deployment
  const apiUrl = "http://localhost:8787";

  useEffect(() => {
    const loggedIn = localStorage.getItem("isLoggedIn");
    if (loggedIn === "true") {
      setIsLoggedIn(true);
    }
  }, []);

  const login = async (email: string, password: string) => {
    // Implement your login logic here

    setIsLoggedIn(true);

    localStorage.setItem("isLoggedIn", "true");

    // Send a message to the queue
    await fetch(`${apiUrl}/api/user/session`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ type: "login", id: 1, time: Date.now() }),
    });
  };

  const logout = async () => {
    setIsLoggedIn(false);

    localStorage.removeItem("isLoggedIn");
  };

  const signup = async (email: string, password: string) => {
    console.log("Signing up with:", email, password);
    setIsLoggedIn(true);

    // Store the user in your database

    // Send a message to the queue
    await fetch(`${apiUrl}/api/user/session`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ type: "signup", id: 1, time: Date.now() }),
    });
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout, signup }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
