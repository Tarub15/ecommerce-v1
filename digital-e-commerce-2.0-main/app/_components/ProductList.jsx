"use client"
import { Button } from '@/components/ui/button'
import React, { useEffect, useState } from 'react'
import Products from '../_mockData/Products';
import ProductCardItem from './ProductCardItem';
import axios from 'axios';
import Link from 'next/link';
import DisplayProductList from './DisplayProductList';

function ProductList() {
    const [productList, setProductList] = useState([]);

    useEffect(() => {
        // setProductList(Products)
        GetProductList()
    }, []);

    const GetProductList=async()=>{
        const result=await axios.get('/api/products?limit=9')
        console.log(result);
        setProductList(result.data)
    }

    return (
        
        <div>
            <h2 className='font-bold text-xl flex justify-between items-center'>Featured
                <span>
                <Link href={'/explore'}>
                <Button> View All</Button>
                </Link>
                </span>
            </h2>

            <DisplayProductList productList={productList}/>

        </div>
    )
}

export default ProductList
