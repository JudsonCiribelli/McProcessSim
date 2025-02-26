"use server";
import { db } from "@/lib/prisma";

import { isValidCpf, removeCpfPunctuation } from "../menu/helpers/cpf";
import CpfForm from "./_Components/CPF-Form-Component/cpf-form";
import OrderList from "./_Components/Order-List/order-list";

interface OrdersPageProps {
  searchParams: Promise<{ cpf: string }>;
}

const OrdersPage = async ({ searchParams }: OrdersPageProps) => {
  const { cpf } = await searchParams;

  if (!cpf) {
    return <CpfForm />;
  }
  if (!isValidCpf(cpf)) {
    return <CpfForm />;
  }

  const orders = await db.order.findMany({
    orderBy: {
      createdAt: "desc",
    },
    where: {
      customerCPF: removeCpfPunctuation(cpf),
    },
    include: {
      restaurant: true,
      orderProducts: {
        include: {
          product: true,
        },
      },
    },
  });
  return <OrderList orders={orders} />;
};

export default OrdersPage;
