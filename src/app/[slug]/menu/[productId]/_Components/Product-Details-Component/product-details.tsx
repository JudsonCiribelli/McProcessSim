'use client'
import { Prisma } from "@prisma/client";
import { ChefHatIcon, ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import Image from "next/image";
import { useContext, useState } from "react";

import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { FormatCurrency } from "@/helpers/format-currency";

import CardSheet from "../../../_Components/Card-Sheets-Component/card-Sheet";
import { CartContext } from "../../../context/cart";


interface ProductDetailsProps{
  product: Prisma.ProductGetPayload<{include: {restaurant: {select: {name: true,avatarImageUrl:true}}}}>
}


const ProductDetails = ({product,}: ProductDetailsProps) => {
  const { toggleCart, addProduct} = useContext(CartContext)
  const [quantity, setQuantity] = useState<number>(1)
  
  const handleDecreaseQuantity = () =>{
    setQuantity((prev) => {
      if(prev === 1){
        return 1
      }
      return prev - 1
    })
  }
  const handleIncreaseQuantity = () =>{
    setQuantity((prev) => prev + 1)
  }

  const handleAddToCart = () =>{
    addProduct({
      ...product, 
      quantity
    })
    toggleCart()
  }

  return(
  <>
    <div className="relative mt-[-1.5rem] p-5 z-50 rounded-t-3xl flex-auto flex flex-col overflow-hidden">
      {/* Nome do restaurante */}
      <div className="flex-auto overflow-hidden">
        <div className="flex items-center gap-1.5 ">
          <Image
          src={product.restaurant.avatarImageUrl}
          alt={product.restaurant.name}
          width={20}
          height={20}
          className="rounded-full"
          />
          <p className="text-xs text-muted-foreground">{product.restaurant.name}</p>
        </div>
       
       {/* Nome do produto + valor */}   
       <h2 className="mt-1 text-xl font-semibold">{product.name}</h2> 
      
        <div className=" mt-3 flex items-center justify-between">
          
          <h3 className="text-xl font-semibold">{FormatCurrency(product.price)}</h3>
          <div className="flex items-center gap-3 text-center">
            <Button variant="outline" className="h-8 w-8 rounded-xl" onClick={handleDecreaseQuantity}>
              <ChevronLeftIcon/>
            </Button>
            <p className="w-4">{quantity}</p>
            <Button variant="destructive" className="h-8 w-8 rounded-xl" onClick={handleIncreaseQuantity}>
             <ChevronRightIcon/>
            </Button>
         
          </div>
        </div>
      

        <ScrollArea className="h-full">
          <div className="mt-2 space-y-3">
            <h4 className="font-semibold">Sobre</h4>
            <p className="text-sm text-muted-foreground">{product.description}</p>
          </div>

          <div className="mt-6 space-y-3">
            <div className="flex gap-1.5">
             <ChefHatIcon size={18}/>
             <h4 className="font-semibold">Ingredientes</h4>
            </div>
            <ul className="list-disc text-sm text-muted-foreground px-5">
              {product.ingredients.map((ingredient) => (
                <li key={ingredient}>{ingredient}</li>
              ))}
            </ul>
          </div>
        </ScrollArea>
      
      </div>
      <Button className="w-full rounded-full" onClick={handleAddToCart}>Adicionar à sacola </Button>
    </div>
    <CardSheet/>
  </>
  )
}
 
export default ProductDetails;