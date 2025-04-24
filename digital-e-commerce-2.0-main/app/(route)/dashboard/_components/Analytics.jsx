"use client"
import axios from 'axios'
import React, { useEffect, useState } from 'react'

function Analytics() {
  const [orderList, setOrderList] = useState([]);

  useEffect(() => {
    // Fetch data when the component mounts
    GetData();
  }, []);

  const GetData = async () => {
    try {
      const result = await axios.get('/api/analytics');
      // Our API returns { result: [...] } so we pick the "result" array
      setOrderList(result.data.result);
    } catch (error) {
      console.error('Error fetching analytics data:', error);
    }
  };

  // Calculate total sold (number of orders) and total revenue (sum of product prices)
  const totalSold = orderList.length;
  const totalRevenue = orderList.reduce(
    (acc, item) => acc + (item.products?.price || 0),
    0
  );

  return (
    <div className='p-6'>
      <h2 className='font-bold text-2xl mt-5'>Analytics</h2>

      {/* Summary Section */}
      <div className='bg-yellow-400 text-black p-4 mt-4 rounded-md shadow-md'>
        <div className='text-xl font-semibold'>
          Total Products Sold: {totalSold}
        </div>
        <div className='text-xl font-semibold'>
          Total Revenue: ${totalRevenue.toFixed(2)}
        </div>
      </div>

      {/* Detailed Orders List */}
      <div className='mt-6 space-y-4'>
        {orderList.map((item) => (
          <div key={item.orders.id} className='flex justify-between items-center border-b pb-4'>
            <div className='flex items-center gap-4'>
              {/* Display product image (fallback provided) */}
              <img
                src={item.products?.imageUrl || "/placeholder.png"}
                alt={item.products?.title || "Product"}
                className='w-20 h-20 object-cover rounded-md'
              />
              <div>
                <h4 className='font-semibold text-lg'>{item.products?.title}</h4>
                {/* Example: Using "about" field for a short description */}
                <p className='text-sm text-gray-600'>{item.products?.about}</p>
                {/* Display user email */}
                <p className='text-sm text-gray-500'>{item.users?.email}</p>
              </div>
            </div>
            {/* Display product price */}
            <div className='text-lg font-bold'>${item.products?.price}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Analytics;