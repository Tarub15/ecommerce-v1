import React, { useContext } from 'react'
import { CartContext } from '../_context/CartContext';
import axios from 'axios';
import { toast } from 'sonner';

function RemoveFromCart({product}) {
    const {cart,setCart}=useContext(CartContext);

    const RemoveItem=async()=>{

        const cartList=cart.filter((item)=>item.id!=product.id);
        setCart(cartList)
        
        const result=await axios.delete('/api/cart?recordId='+product?.id)
        toast("Item Removed");
      }
  return (
    <div>
      <h2 className='font-bold text-red-500 cursor-pointer' onClick={RemoveItem}>Remove</h2>
    </div>
  )
}

export default RemoveFromCart
