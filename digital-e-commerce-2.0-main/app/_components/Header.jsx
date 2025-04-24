"use client";
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { UserButton } from '@clerk/nextjs';
import { ShoppingBag } from 'lucide-react';
import Link from 'next/link';
import React, { useContext } from 'react';
import { CartContext } from '../_context/CartContext';
import CartList from './CartList';

function Header() {
  const MenuList = [
    { name: 'Home', path: '/' },
    { name: 'Store', path: '/dashboard' },
    { name: 'Explore', path: '/explore' }
  ];

  const { cart } = useContext(CartContext);

  return (
    <div className='flex p-4 px-10 md:px-32 lg:px-48 bg-primary border-b-4 border-black justify-between items-center'>
      <Link href={'/'}>
        <h2 className='font-bold text-lg bg-black text-white px-2 p-1'>DIGI STORE</h2>
      </Link>

      <ul className='hidden md:flex gap-5'>
        {MenuList.map((menu, index) => (
          <li key={index}>
            <Link href={menu.path}>
              <span className='hover:border-2 hover:border-white cursor-pointer px-2 p-1'>
                {menu.name}
              </span>
            </Link>
          </li>
        ))}
      </ul>

      <div className='flex gap-5 items-center'>
        <CartList>
          <div className='flex items-center'>
            <ShoppingBag />
            <Badge className="bg-black text-white hover:bg-black rounded-full py-1">
              {cart?.length}
            </Badge>
          </div>
        </CartList>

        <Link href={'/dashboard'}>
          <Button className='bg-red-500 hover:bg-red-600'>Start Selling</Button>
        </Link>

        <UserButton />
      </div>
    </div>
  );
}

export default Header;
