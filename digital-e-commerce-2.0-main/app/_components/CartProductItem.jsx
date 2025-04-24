import { Card } from '@/components/ui/card'
import axios from 'axios'
import Image from 'next/image'
import React, { useContext } from 'react'
import { toast } from 'sonner'
import { CartContext } from '../_context/CartContext'

function CartProductItem({product}) {

    const {cart,setCart}=useContext(CartContext);

    const RemoveItem=async()=>{

        const cartList=cart.filter((item)=>item.id!=product.id);
        setCart(cartList)
        
        const result=await axios.delete('/api/cart?recordId='+product?.id)
        toast("Item Removed");
      }

  return (
    <div>
      <Card className="flex gap-5">
        <Image src={product?.imageUrl} alt={product?.title} width={70} height={70} 
        className='h-[70px] w-[70px] object-cover'/>
        <div>
            <h2 className='font-bold'>{product?.title}</h2>
            <h2 className='font-bold text-yellow-600 text-lg'>${product?.price}</h2>
            <h2 className='font-bold text-red-500 cursor-pointer' onClick={RemoveItem}>Remove</h2>
        </div>
      </Card>
    </div>
  )
}

export default CartProductItem
