import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const ProductsPage = () => {
  return (
    <div className="border p-5 border-red-500 rounded-xl">
      <h1 className="text-red-500">Products Page</h1>
      <Input type="text" placeholder="Digite aqui" />
      <Button className="mt-2">Clique</Button>
    </div>
  );
};

export default ProductsPage;
