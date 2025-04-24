import Products from "@/app/_mockData/Products";
import { db } from "@/configs/db";
import { storage } from "@/configs/firebaseConfig";
import { productsTable, usersTable } from "@/configs/schema";
import { currentUser } from "@clerk/nextjs/server";
import { and, desc, eq, getTableColumns } from "drizzle-orm";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { NextResponse } from "next/server";

export async function POST(req){
    //Get FormData (Fields, Files)
    const formData=await req.formData();
    const image=formData.get('image');
    const file=formData.get('file');
    const data=JSON.parse(formData.get('data'));

    console.log(image,file,data);

    //Save  Product Image to Firebase Storage
    const imageName=Date.now()+".png";
    const storageRef=ref(storage,"file/"+imageName);

    await uploadBytes(storageRef,image).then(snapshot=>{
        console.log('Image Upload!!!')
    })
    const imageUrl=await getDownloadURL(storageRef);
    console.log({imageUrl});

    //Save Product/File Document to firebase storage
    const fileName=Date.now().toString();
    const storageFileRef=ref(storage,"file/"+fileName);

    await uploadBytes(storageFileRef,file).then(snapshot=>{
        console.log('File Upload!!!')
    })
    const fileUrl=await getDownloadURL(storageFileRef);
    console.log({fileUrl});

    // Set formData along with URL into the database
    const result = await db.insert(productsTable).values({
        title: data?.title,
        category: data?.category,
        description: data.description,
        fileUrl: fileUrl,
        imageUrl: imageUrl,
        price: data?.price,
        about: data?.about,
        message: data?.message,
        createdBy: data?.userEmail,
    }).returning(productsTable)
    

    return NextResponse.json({result})
}

export async function GET(req) {
    const {searchParams}=new URL(req.url);
    const email=searchParams.get('email');
    const limit=searchParams.get('limit');
    const id=searchParams.get('id');

    if(email){

    
        const result=await db.select({
            ...getTableColumns(productsTable),
            user: {
                name: usersTable.name,
                image: usersTable.image
            }
        }).from(productsTable)
        .innerJoin(usersTable, eq(productsTable.createdBy, usersTable.email))
        .where(eq(productsTable.createdBy,email)).orderBy(desc(productsTable.id))

        return NextResponse.json(result);
    }
    if(id){
        const result=await db.select({
            ...getTableColumns(productsTable),
            user: {
                name: usersTable.name,
                image: usersTable.image
            }
        }).from(productsTable)
        .innerJoin(usersTable, eq(productsTable.createdBy, usersTable.email))
        .where(eq(productsTable.id,id))
        .orderBy(desc(productsTable.id))
        
        return NextResponse.json(result[0]);  
    }

    

    const result=await db.select({
        ...getTableColumns(productsTable),
        user: {
            name: usersTable.name,
            image: usersTable.image
        }
    }).from(productsTable)
    .innerJoin(usersTable, eq(productsTable.createdBy, usersTable.email))
    .orderBy(desc(productsTable.id))
    .limit(Number(limit))

    // console.log(result);

    return NextResponse.json(result);
}

export async function DELETE(req){

    const {searchParams}=new URL(req.url);
    const productId=searchParams.get('productId');
    const user=await currentUser();

    const result=await db.delete(productsTable)
    .where(and(eq(productsTable.id,productId),
    eq(productsTable.createdBy,user?.primaryEmailAddress?.emailAddress)));

    return NextResponse.json({result:'Deleted!!!'})
}

// export async function DELETE(req) {
//     try {
//       const { searchParams } = new URL(req.url);
//       const productId = searchParams.get('productId');
//       const user = await currentUser();
  
//       if (!productId || !user) {
//         return NextResponse.json({ error: 'Missing data' }, { status: 400 });
//       }
  
//       // Step 1: Delete related orders first
//       await db.delete(ordersTable)
//         .where(eq(ordersTable.productId, productId));
  
//       // Step 2: Delete the product
//       const result = await db.delete(productsTable)
//         .where(and(
//           eq(productsTable.id, productId),
//           eq(productsTable.createdBy, user?.primaryEmailAddress?.emailAddress)
//         ));
  
//       return NextResponse.json({ result: 'Deleted!!!' });
//     } catch (error) {
//       console.error('DELETE error:', error);
//       return NextResponse.json({ error: 'Failed to delete' }, { status: 500 });
//     }
//   }