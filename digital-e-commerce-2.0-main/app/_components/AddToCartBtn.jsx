import { Button } from '@/components/ui/button';
import React, { useContext, useState } from 'react'
import ProductEditableOption from './ProductEditableOption';
import { MoreVerticalIcon } from 'lucide-react';
import { CartContext } from '../_context/CartContext';
import axios from 'axios';
import { useUser } from '@clerk/nextjs';
import { toast } from 'sonner';

function AddToCartBtn({product, editable, size="sm"}) {
    const { cart, setCart } = useContext(CartContext);
    const [loading, setLoading] = useState(false);
    const {user}=useUser();
    const AddToCart = async () => {
        setLoading(true);
        setCart(cart => [...cart, product]);
        const result = await axios.post('/api/cart', {
            email: user?.primaryEmailAddress?.emailAddress,
            productId: product?.id
        });
        toast('Item Added to Cart')
        setLoading(false);


        //console.log(result.data);
    }
    return (
        <div>
            {!editable ?
                <Button size={size} className='mt-1 w-full' disabled={loading} onClick={AddToCart}>
                    Add To Cart</Button>
                : <ProductEditableOption product={product}>
                    <MoreVerticalIcon className='cursor-pointer' />
                </ProductEditableOption>}
        </div>
    )
}

export default AddToCartBtn
