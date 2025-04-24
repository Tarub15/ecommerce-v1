"use client"
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import axios from 'axios';
import Image from 'next/image';
import { useParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import SimilarProducts from './_components/SimilarProduct';
import SimilarProduct from './_components/SimilarProduct';
import AddProduct from '../../add-product/page';
import AddToCartBtn from '@/app/_components/AddToCartBtn';

function ProductDetail() {
  const { productId } = useParams();
  const [product, setProduct] = useState();

  useEffect(() => {
    GetProductDetail();
  }, [])

  const GetProductDetail = async () => {
    const result = await axios.get('/api/products?id=' + productId);
    console.log(result.data);
    setProduct(result.data);
  }

  return product && (
    <div className='mt-10'>
      <h2>BACK</h2>

      <div className='grid grid-cols-1 md:grid-cols-2 mt-6 gap-10'>
        <Card className="flex items-center justify-center max-h-[400px]">
          <Image src={product?.imageUrl} alt='image' width={400} height={400}
            className='h-[400px] w-full object-contain'
          />
        </Card>
        <div className='flex flex-col gap-5'>
          <div>
            <h2 className='font-bold text-2xl'>{product?.title}</h2>
            <Badge className="">{product?.category}</Badge>
          </div>
          <h2 className='font-bold text-3xl text-yellow-600'>${product.price}</h2>
          <p className='text-gray-500'>The {product?.category} will be sent to your register email id once you purchase this digital content.</p>
          
          {/* <Button className="w-full" size="lg">Add to Cart</Button> */}
          <AddToCartBtn size="lg" product={product}/>

          <Accordion type="single" collapsible>
            <AccordionItem value="item-1">
              <AccordionTrigger>Description</AccordionTrigger>
              <AccordionContent>
                {product?.description}
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger>About product</AccordionTrigger>
              <AccordionContent>
                {product?.about}
              </AccordionContent>
            </AccordionItem>
          </Accordion>

        </div>
      </div>

      <div className='mt-10'>
        <SimilarProduct category={product?.category}/>
      </div>
    </div>
  )
}

export default ProductDetail
