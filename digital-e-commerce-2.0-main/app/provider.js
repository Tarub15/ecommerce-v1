"use client";
import React, { useEffect, useState } from 'react';
import Header from './_components/Header';
import axios from 'axios';
import { useUser } from '@clerk/nextjs';
import { CartContext } from './_context/CartContext';
import { PayPalScriptProvider } from '@paypal/react-paypal-js';
import ChatBot from './_components/ChatBot';

function Provider({ children }) {
  const { user } = useUser();
  const [cart, setCart] = useState([]);
  const [isClient, setIsClient] = useState(false); // 💡 Fix hydration

  useEffect(() => {
    setIsClient(true); // ✅ Only render on client
  }, []);

  useEffect(() => {
    if (user) {
      CheckIsNewUser();
      GetCartItems();
    }
  }, [user]);

  const CheckIsNewUser = async () => {
    await axios.post('/api/user', { user });
  };

  const GetCartItems = async () => {
    const result = await axios.get('/api/cart?email=' + user?.primaryEmailAddress?.emailAddress);
    setCart(result.data);
  };

  if (!isClient) return null; // 🛑 Prevent SSR mismatch

  return (
    <CartContext.Provider value={{ cart, setCart }}>
      <PayPalScriptProvider options={{ clientId: process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID }}>
        <Header />
        <div>{children}</div>
        <ChatBot />
      </PayPalScriptProvider>
    </CartContext.Provider>
    
  );
}

export default Provider;
