"use client"
import ProductCardItem from '@/app/_components/ProductCardItem';
import { Button } from '@/components/ui/button'
import { useUser } from '@clerk/nextjs';
import axios from 'axios';
import Link from 'next/link';
import React, { useEffect, useState } from 'react'

function UserListing() {
    const[listing,setListing]=useState([]);
    const[loading,setLoading]=useState(false);
    const {user}=useUser();

    useEffect(()=>{
      user&&GetUserProductList();
    },[user])

    const GetUserProductList=async()=>{
      setLoading(true);
      const result=await axios.get('/api/products?email='+user?.primaryEmailAddress?.emailAddress);
      // console.log(result.data);
      setListing(result.data);
      setLoading(false);
    }
  return (
    <div className='mt-5'>
      <h2 className='font-bold text-xl flex justify-between items-center'>Listing
      <Link href={'/add-product'}>  
      <Button>+ Add New Product</Button>
      </Link>
      </h2>

      <div>
        {listing?.length==0&&
            <h2 className='font-medium text-2xl text-center text-gray-400 mt-10'>No Products Found.</h2>
        }

        <div className='grid grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-5 mt-5'>
          {listing.map((product,index)=>(
            <ProductCardItem key={index} product={product}
              editable={true}
            />
          ))}
        </div>
      </div>
      
    </div>
  )
}

export default UserListing
