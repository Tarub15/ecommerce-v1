"use client"
import CheckoutProductItem from '@/app/_components/CheckoutProductItem';
import { CartContext } from '@/app/_context/CartContext'
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useUser } from '@clerk/nextjs';
import { PayPalButtons } from '@paypal/react-paypal-js';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import React, { useContext, useState } from 'react'
import { toast } from 'sonner';

function Checkout() {
    const {cart,setCart}=useContext(CartContext);
    const {user}=useUser();
    const [loading,setLoading]=useState(false);
    const router=useRouter();
    const calculateTotal=()=>{
        let total=0;
        cart.forEach(item=>{
            total=total+Number(item.price)
        })
        return total;
    }

    const onPaymentSuccess=async()=>{
        // console.log("Payment Success")
        setLoading(true);
        const result=await axios.post('/api/order',{
            orderDetail:cart,
            email:user?.primaryEmailAddress?.emailAddress
        });

        if(result){
            setCart([]);
            toast("Order Created Successfully!");
        }
        setLoading(false);
        router.replace('/dashboard');

        console.log(result);
    }

  return (
    <div className='mt-10'>
      <h2 className='font-bold text-3xl'>Checkout</h2>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-10 mt-5'>
        <div className='flex flex-col gap-3'>
            {cart.map((product,index)=>(
                <CheckoutProductItem product={product} key={index}/>
            ))}
        </div>
        <div>
            <Card className="p-5">
                <h2 className='font-bold text-2xl flex justify-between'>Total : <span>${calculateTotal()}</span></h2>
                <hr className='my-5 border-black'/>
                <p>Your payment reciept and you product will be delivered to your registered email ID :</p>
                    <Badge className='text-black ml-3'>{user?.primaryEmailAddress?.emailAddress}</Badge>
                    <Button onClick={onPaymentSuccess}>CREATE ORDER</Button>
                <div className='mt-10'>

                {calculateTotal()&&    <PayPalButtons style={{ layout: "horizontal" }} 
                        onApprove={()=>onPaymentSuccess()}
                        onCancel={()=>toast("Payment Failed!")}
                        createOrder={(data,actions)=>{
                            return actions.order.create({
                                purchase_units:[
                                    {
                                        amount:{
                                            value:calculateTotal(),
                                            currency_code:"USD"
                                        }
                                    }
                                ]
                            })
                        }}
                    />}
                </div>
                
            </Card>
        </div>
      </div>
    </div>
  )
}

export default Checkout
