import { useContext } from "react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Sheet, SheetContent,SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { FormatCurrency } from "@/helpers/format-currency";

import { CartContext } from "../../context/cart";
import CartProductItem from "../Cart-Item-Component/cart-product-Item";

const CartSheet = () => {
  const {isOpen, toggleCart, products, total} = useContext(CartContext)
  return ( 
    <Sheet open={isOpen} onOpenChange={toggleCart}>
      <SheetContent className="w-[80%]">
        <SheetHeader>
         <SheetTitle className="text-left">Sacola</SheetTitle>
        </SheetHeader>
        <div className="flex flex-col h-full py-5">
         
         <div className="flex-auto"> 
           {products.map((product) => (
           <CartProductItem product={product} key={product.id}/>
           ))}
         </div>
          <Card className="mb-6">
           <CardContent className="p-5">
            <div className="flex justify-between">
              <p className="text-sm text-muted-foreground">Total:</p>
              <p className="font-semibold text-sm">{FormatCurrency(total)}</p>
            </div>
           </CardContent>
          </Card>
          <Button className="w-full rounded-full">Finalizar pedido</Button>
        
        </div>
      </SheetContent>
    </Sheet>    
   );
}
 
export default CartSheet;