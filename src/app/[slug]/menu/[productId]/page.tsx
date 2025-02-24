
import { notFound } from "next/navigation";

import { db } from "@/lib/prisma";

import HeaderProduct from "./_Components/Header-Products-Components/header-product";

interface ProductPageProps{
  params: Promise<{slug: string, productId: string}>
}

const ProductPage = async ({params}:ProductPageProps) => {
  const {slug, productId} = await params
  const  product = await db.product.findUnique({where:{ id: productId}})
  if(!product){
    return notFound()
  }
  return ( 
    <>
    <HeaderProduct product={product}/>
     {slug}    
    </>
   );
}
 
export default ProductPage;