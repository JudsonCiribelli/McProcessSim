"use server";

import { ConsumptionMethod } from "@prisma/client";
import { headers } from "next/headers";
import Stripe from "stripe";

import { db } from "@/lib/prisma";

import { CartProduct } from "../context/cart";
import { removeCpfPunctuation } from "../helpers/cpf";

interface CreateStripeCheckoutInput {
  products: CartProduct[];
  orderId: number;
  slug: string;
  consumptionMethod: ConsumptionMethod;
  cpf: string;
}

export const createStripeCheckout = async ({
  orderId,
  products,
  slug,
  cpf,
  consumptionMethod,
}: CreateStripeCheckoutInput) => {
  if (!process.env.STRIPE_SECRET_KEY) {
    throw new Error("Missing stripe secret key!");
  }
  const origins = (await headers()).get("origin");
  const productsWithPrices = await db.product.findMany({
    where: {
      id: {
        in: products.map((product) => product.id),
      },
    },
  });

  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
    apiVersion: "2025-02-24.acacia",
  });
  const searchParams = new URLSearchParams();
  searchParams.set("consumptionMethod", consumptionMethod);
  searchParams.set("cpf", removeCpfPunctuation(cpf));
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    mode: "payment",
    success_url: `${origins}/${slug}/orders?${searchParams.toString()}`,
    cancel_url: `${origins}/${slug}/orders?${searchParams.toString()}`,
    metadata: {
      orderId,
    },
    line_items: products.map((product) => ({
      price_data: {
        currency: "brl",
        product_data: {
          name: product.name,
          images: [product.imageUrl],
        },
        unit_amount:
          productsWithPrices.find((p) => p.id === product.id)!.price * 100,
      },
      quantity: product.quantity,
    })),
  });

  return { sessionId: session.id };
};
