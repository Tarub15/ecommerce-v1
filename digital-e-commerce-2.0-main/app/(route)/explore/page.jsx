"use client"
import DisplayProductList from '@/app/_components/DisplayProductList';
import SortProducts from '@/app/_components/SortProducts';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import axios from 'axios'
import { Search } from 'lucide-react';
import React, { useEffect, useState } from 'react'
import { toast } from 'sonner';

function Explore() {
    const [productList,setProductList]=useState([]);
    const [offset,setOffset]=useState(0);
    const [searchInput,setSearchInput]=useState("");
    const [sort,setSort]=useState({
        
            label: 'NEWEST',
            field: 'id',
            order: 'desc'
        
    });

    useEffect(()=>{
        GetProductList(offset);
    },[])

    const GetProductList=async(offset_)=>{
        const result=await axios.post('/api/all-products',{
            limit:9,
            offset:offset_,
            searchText:searchInput,
            sort:sort??[]
        });
        // console.log(result.data);

        if(result?.data?.error){
            toast(result?.data?.error)
            return;
        }
        if(productList?.length==0){
            setProductList(result.data)
        }
        else{
            setProductList(prev=>[...prev,...result.data]);
        }
        
    }

    useEffect(()=>{
        if(sort){
            setProductList([]);
            GetProductList(0);
        }
    },[sort])

  return (
    <div className='mt-10'>
      <h2 className='text-3xl font-bold'>Explore</h2>

      <div className='mt-5 mb-5 flex items-center justify-between'>
        <div className='flex gap-2 items-center'>
            <h2>Search :</h2>
            <Input placeholder="Search" className="w-80"
                onChange={(event)=>setSearchInput(event.target.value)}
            />
            <Button onClick={()=>{
                GetProductList(0);
                setProductList([])
                }}> <Search/>Search</Button>
        </div>
        <SortProducts onSortChange={(value)=>setSort(value)}/>
      </div>
      <DisplayProductList productList={productList}/>
        <div className='flex justify-center items-center mt-10'>
            <Button onClick={()=>GetProductList(offset+6)}>Load More</Button>
        </div>
    </div>
        
    
  )
}

export default Explore
