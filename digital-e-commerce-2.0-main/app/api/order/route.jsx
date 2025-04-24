import { db } from "@/configs/db";
import { cartTable, orderTable, productsTable } from "@/configs/schema";
import EmailOrder from "@/emails/email";
import { useUser } from "@clerk/nextjs";
import { currentUser } from "@clerk/nextjs/server";
import { desc, eq, getTableColumns } from "drizzle-orm";
import { NextResponse } from "next/server";
import { use } from "react";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request) {
    // Get Order Detail
    const { orderDetail,email } = await request.json();

    // Insert record to Order Table
    let orderList=[];
    orderDetail.forEach((order) => {
        orderList.push({
            email: email,
            productId: order.productId
        })
    });

    const result=await db.insert(orderTable)
    .values(orderList);

    const deleteResult=await db.delete(cartTable)
    .where(eq(cartTable.email,email))

    //Send Email
    const SendEmailResult=await SendEmail(orderDetail,email );
    console.log(SendEmailResult);

    // Delete user cart item
    return NextResponse.json(result);
}

const SendEmail=async(orderDetail, userEmail)=>{
    const calculateTotal=()=>{
        let total=0;
        orderDetail.forEach(item=>{
            total=total+Number(item.price)
        })
        return total;
    }
    
    const result = await resend.emails.send({
        from: 'digistore@resend.dev',
        to: userEmail,
        subject: 'Digistore Order Delivery Reciept',
        react: <EmailOrder orderDetail={orderDetail} totalAmount={calculateTotal()} />,
      });

      return result;
}

// Used to get Order List

export async function GET(req){
    const user=await currentUser();

    const result=await db.select({
        ...getTableColumns(productsTable)
    }).from(orderTable)
    .innerJoin(productsTable,eq(productsTable.id,orderTable.productId))
    .where(eq(orderTable.email,user?.primaryEmailAddress?.emailAddress))
    .orderBy(desc(orderTable.id))

    return NextResponse.json(result);
}

