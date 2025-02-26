"use server";

import { ConsumptionMethod } from "@prisma/client";
import { redirect } from "next/navigation";

import { db } from "@/lib/prisma";

import { removeCpfPunctuation } from "../helpers/cpf";

interface createOrderInput {
  customerName: string;
  customerCPF: string;
  products: Array<{
    id: string;
    quantity: number;
  }>;
  consumptionMethod: ConsumptionMethod;
  slug: string;
}

export const createOrder = async (Input: createOrderInput) => {
  const restaurant = await db.restaurant.findUnique({
    where: {
      slug: Input.slug,
    },
  });
  if (!restaurant) {
    throw new Error("Restaurant not found");
  }
  const productsWithPrices = await db.product.findMany({
    where: {
      id: {
        in: Input.products.map((product) => product.id),
      },
    },
  });

  const productsWithPricesAndQuantity = Input.products.map((product) => ({
    productId: product.id,
    quantity: product.quantity,
    price: productsWithPrices.find((p) => p.id === product.id)!.price,
  }));

  await db.order.create({
    data: {
      status: "PENDING",
      customerName: Input.customerName,
      customerCPF: removeCpfPunctuation(Input.customerCPF),
      orderProducts: {
        createMany: {
          data: productsWithPricesAndQuantity,
        },
      },
      total: productsWithPricesAndQuantity.reduce(
        (acc, product) => acc + product.price * product.quantity,
        0,
      ),
      consumptionMethod: Input.consumptionMethod,
      restaurantId: restaurant.id,
    },
  });
  redirect(`/${Input.slug}/orders?cpf=${removeCpfPunctuation(Input.customerCPF)}`)
};
