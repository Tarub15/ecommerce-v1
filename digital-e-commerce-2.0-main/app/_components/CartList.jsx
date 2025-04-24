import React, { useContext } from 'react'
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import { CartContext } from '../_context/CartContext'
import CartProductItem from './CartProductItem';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

function CartList({children}) {

    const {cart,setCart}=useContext(CartContext);

    const calculateTotal=()=>{
        let total=0;
        cart.forEach(item=>{
            total=total+Number(item.price)
        })
        return total;
    }

    return (
        <div>
            <Sheet>
                <SheetTrigger>
                    {children}
                </SheetTrigger>
                <SheetContent>
                    <SheetHeader>
                        <SheetTitle>Cart ({cart?.length})</SheetTitle>
                        <SheetDescription asChild>
                            <div>
                                <p>All of your cart items are listed below.</p>
                                <div className='flex flex-col gap-2 mt-5'>
                                    {cart.map((product,index)=>(
                                        <CartProductItem key={index} product={product} />
                                    ))}
                                </div>

                                <div>
                                    <h2 className='font-bold text-2xl justify-between mt-10 flex'>Total : <span>${calculateTotal()}</span></h2>
                                    <Link href='/checkout'>
                                    <Button className="w-full mt-3">Checkout</Button>
                                    </Link>
                                </div>
                            </div>
                        </SheetDescription>
                    </SheetHeader>
                </SheetContent>
            </Sheet>
        </div>
    )
}

export default CartList
