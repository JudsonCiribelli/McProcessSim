import { ChevronLeftIcon, ChevronRightIcon, TrashIcon } from "lucide-react";
import Image from "next/image";
import { useContext } from "react";

import { Button } from "@/components/ui/button";
import { FormatCurrency } from "@/helpers/format-currency";

import { CartContext, CartProduct } from "../../context/cart";

interface CartItemProps{
  product: CartProduct
}

const CartProductItem = ({product}: CartItemProps) => {
  const {decreaseProductQuantity, increaseProductQuantity, removeProductToCart}  = useContext(CartContext)
  return ( 
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-3">
        <div className="relative h-20 w-20 rounded-xl bg-gray-100">
         <Image
         src={product.imageUrl}
         alt={product.name}
         fill
         />
        </div>

        <div className="space-y-1">
          
          <p className="text-xs max-w-[90%] truncate text-ellipsis">{product.name}</p>
          <p className="text-sm font-semibold">{FormatCurrency(product.price)}</p>
        
          <div className="flex items-center gap-1 text-center">
            
            <Button variant="outline" className="w-7 h-7 rounded-xl" onClick={() => decreaseProductQuantity(product.id)}>
             <ChevronLeftIcon/>
            </Button>
            
            <p className="text-xs w-7">{product.quantity}</p>
            
            <Button variant="destructive" className="w-7 h-7 rounded-xl" onClick={() => increaseProductQuantity(product.id)}>
             <ChevronRightIcon/>
             </Button>
          
          </div>
        </div>        
      </div>

      <Button className="h-7 w-7 rounded-lg" variant="outline" onClick={() => removeProductToCart(product.id)}>
        <TrashIcon/>
      </Button>

    </div>
   );
}
 
export default CartProductItem;