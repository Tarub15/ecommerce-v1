"use client"
import Image from 'next/image'
import React, { useState } from 'react'

function ImageUpload({onImageSelect}) {

  const[image,setImage]=useState();
  const handleFileChange=(event)=>{
    const file=event.target.files[0];
    onImageSelect(event)
    // console.log(file);
    const render=new FileReader();
    render.onloadend=()=>{
      setImage(render.result)
    }
    render.readAsDataURL(file)
  }

  return (
    <div>
      <h2>Upload Product  Image</h2>
      <input type='file' id='imageUpload' name='image' className='hidden' onChange={handleFileChange} />

      <label htmlFor="imageUpload">
        <div className='p-10 flex justify-center items-center cursor-pointer border-dashed border-2 border-black bg-slate-200'>
          {image?
          <Image src={image} alt={'Product Image'} width={300} height={300} className='object-contain h-[200px]'/>:
          <Image src={'/upload.png'} alt='image' width={100} height={100} className='opacity-35'/>
        }
            
        </div>
      </label>

    </div>
  )
}

export default ImageUpload
