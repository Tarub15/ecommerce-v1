import React, { useState } from 'react'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

function SortProducts({onSortChange}) {
    const list = [
        {
            label: 'NEWEST',
            field: 'id',
            order: 'desc'
        },
        {
            label: 'PRICE (Low to High)',
            field: 'price',
            order: 'asc'
        },
        {
            label: 'PRICE (High to Low)',
            field: 'price',
            order: 'asc'
        },
        {
            label: 'Most Viewed',
            field: 'id',
            order: 'desc'
        },
    ]

    const[selectedSort,setSelectedSort]=useState();

    return (
        <div>
            <Select onValueChange={(value)=>{onSortChange(value); setSelectedSort(value)}}>
                <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Sort" >
                        {selectedSort?.label??'Sort'}
                    </SelectValue>
                </SelectTrigger>
                <SelectContent>
                    {list.map((option,index)=>(
                        <SelectItem key={index} value={option}>{option.label}</SelectItem>
                    ))}
                    
                </SelectContent>
            </Select>
        </div>
    )
}

export default SortProducts
