"use client"
import { Input } from '@/components/ui/input'
import React, { useEffect, useState } from 'react'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import ImageUpload from './_components/ImageUpload'
import axios from 'axios'
import { useUser } from '@clerk/nextjs'
import { Loader2Icon } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'

function AddProduct() {
    const categoryOption=['Source Code','UI Kit','Iocn','Document','Fonts','Theme','Video','Illustration','Other']
    const [formData,setFormData]=useState([]);
    const {user}=useUser();
    const [loading,setLoading]=useState(false);
    const router=useRouter();
    useEffect(()=>{
        setFormData({
            userEmail:user?.primaryEmailAddress?.emailAddress
        })
    },[user])

    const handleInputChange=(fieldName,fieldValue)=>{
        setFormData(prev=>({
            ...prev,
            [fieldName]:fieldValue
        }))
        console.log(formData);
    }

    const onAddProductBtnClick=async()=>{
        console.log(formData);
        setLoading(true);
        const formDataObj=new FormData();
        formDataObj.append('image',formData.image);
        formDataObj.append('file',formData.file);
        formDataObj.append('data',JSON.stringify(formData));

        const result=await axios.post('/api/products',formDataObj,{
            headers:{
                "Content-Type":'multiport/form-data' // we are passing JSON data + files + images
            }
        })

        // console.log(result);
        setLoading(true);

        if(result){
            toast("Success! New Product Added to your listing.")
            router.push('/dashboard')
        }
    }

    return (
        <div className='mt-10'>
            <h2 className='font-bold text-3xl'>AddProduct</h2>
            <p className='font-medium'>Add product details to start selling products.</p>

            <div className='grid grid-cols-1 md:grid-cols-2 gap-5 mt-10'>
                <div className='flex flex-col gap-5'>
                    <ImageUpload onImageSelect={(e)=>handleInputChange(e.target.name,e.target.files[0])}/>
                    <div>
                        <h4>Upload file that you want to sell</h4>
                        <Input type="file" name="file" onChange={(e)=>handleInputChange(e.target.name,e.target.files[0])}/>
                    </div>
                    <div>
                        <h4>Message to User</h4>
                        <Textarea name='message' placeholder='Write Thank You message to User' onChange={(e)=>handleInputChange(e.target.name,e.target.value)} />
                    </div>
                </div>
                <div className='flex flex-col gap-5'>
                    <div>
                        <h4>Product Title</h4>
                        <Input name="title" placeholder="Ex. UI Kit in Figma" onChange={(e)=>handleInputChange(e.target.name,e.target.value)} />
                    </div>
                    <div>
                        <h4>Price</h4>
                        <Input type="number" name="price" placeholder="Ex. $ 99" onChange={(e)=>handleInputChange(e.target.name,e.target.value)} />
                    </div>
                    <div>
                        <h4>Category</h4>
                        <Select onValueChange={(value)=>handleInputChange('category',value)}>
                            <SelectTrigger className="w-[180px]">
                                <SelectValue placeholder="Select Category" />
                            </SelectTrigger>
                            <SelectContent>
                                {categoryOption?.map((category,index)=>(
                                    <SelectItem key={index} value={category}>{category}</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                    <div>
                        <h4>Description</h4>
                        <Textarea name='description' placeholder='Add Product Description' onChange={(e)=>handleInputChange(e.target.name,e.target.value)}/>
                    </div>
                    <div>
                        <h4>About Product (Optional)</h4>
                        <Textarea name='about' placeholder='Add Product Information' onChange={(e)=>handleInputChange(e.target.name,e.target.value)} />
                    </div>
                    <Button onClick={onAddProductBtnClick} disabled={loading}>
                        {loading?<Loader2Icon className='animate-spin'/>:'Add Product'}
                        </Button>
                </div>
            </div>
        </div>
    )
}

export default AddProduct
