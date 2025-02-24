import { Product } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";

import { FormatCurrency } from "@/helpers/format-currency";

interface ProductsProps{
  products: Product[]
}
const Products = ({products}: ProductsProps) => {
  const {slug} = useParams<{slug: string}>()

  return ( 
    <div className="space-y-3 px-1.5">
      {products.map((product) => (
        <Link href={`/${slug}/menu/${product.id}`} key={product.id} className="flex items-center justify-between gap-10 py-3 px-3 border-b">
          {/* ESQUERDA */}
          <div>
            <h3 className="text-sm font-medium">{product.name}</h3>
            <p className="line-clamp-2 text-sm text-muted-foreground">{product.description}</p>
            <p className="pt-3 text-sm font-semibold">{FormatCurrency(product.price)}</p>
          </div>
          {/* DIREITA */}
          <div className="relative min-h-[82px] min-w-[120px]">
            <Image
            src={product.imageUrl}
            fill
            alt={product.name}
            className="roudend-lg object-contain"
            />
          </div>
        </Link>
      ))}
    </div>
   );
}
 
export default Products;