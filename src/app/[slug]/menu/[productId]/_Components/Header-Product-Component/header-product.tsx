'use client'
import { Product } from "@prisma/client";
import { ChevronLeftIcon, ScrollTextIcon } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";

interface ProductHeaderProps{
  product: Pick<Product, 'name' | 'imageUrl'>
}

const HeaderProduct = ({product}: ProductHeaderProps) => {
  const Router =  useRouter()
  const handleBackClick = () =>{
    return Router.back()
  }
  return ( 
      <div className="relative min-h-[300px] w-full">
        <Button
         onClick={handleBackClick}
         variant="secondary"
         size="icon"
         className="absolute left-4 top-4 z-50 rounded-full">
         <ChevronLeftIcon />
        </Button>
      
       <Image src={product.imageUrl} alt={product.name} fill className="object-contain"/>
      
        <Button
         variant="secondary"
         size="icon"
         className="absolute right-4 top-4 z-50 rounded-full"
         >
         <ScrollTextIcon />
        </Button>
      </div>
   );
}
 
export default HeaderProduct;