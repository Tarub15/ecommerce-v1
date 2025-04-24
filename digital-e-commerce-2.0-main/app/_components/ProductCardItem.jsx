import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { MoreVerticalIcon } from 'lucide-react'
import Image from 'next/image'
import React, { useContext, useState } from 'react'
import ProductEditableOption from './ProductEditableOption'
import Link from 'next/link'
import axios from 'axios'
import { useUser } from '@clerk/nextjs'
import { CartContext } from '../_context/CartContext'
import AddToCartBtn from './AddToCartBtn'

function ProductCardItem({product,editable=false,user,purchase}) {

  const {cart,setCart}=useContext(CartContext);
  const [loading,setLoading]=useState(false);
  //  const {user}=useUser();
  const AddToCart=async()=>{
    setLoading(true);
    setCart(cart=>[...cart,product]);
    const result=await axios.post('/api/cart',{
      email:user?.primaryEmailAddress?.emailAddress,
      productId:product?.id
    });
    
    setLoading(false);


    //console.log(result.data);
  }

  return (
    
    
      <Card className="p-3">
        <Link href={'/explore/'+product?.id}>
        <Image src={product?.imageUrl || '/pc.png'} alt={product?.title} width={400} height={300} className='h-[180px] object-cover' />
        </Link>
        <div className='mt-3'>
          <Link href={'/explore/'+product?.id}>
            <h2 className='font-bold text-sm md:text-xl line-clamp-1'>{product.title}</h2>
          </Link>
            <h2 className='font-bold text-2xl text-yellow-500'>${product.price}</h2>
            <div className='mt-3 md:flex justify-between items-center'>
                {!purchase&&
                <>
                <div className='flex gap-1 items-center'>
                    <Image src={product?.user?.image || '/logo.svg'} alt='user' width={20} height={20} className='rounded-full'/>
                    <h2 className='text-sm text-gray-500'>{product?.user?.name}</h2>
                </div>
                <AddToCartBtn product={product} editable={editable} />
                </>}
                {purchase&&
                <Link href={product?.fileUrl}>
                <Button className='w-full bg-green-600 text-white'>Download Content</Button>
                </Link>}
                
            </div>
        </div>  
      </Card>
    
    
    
  )
}

export default ProductCardItem