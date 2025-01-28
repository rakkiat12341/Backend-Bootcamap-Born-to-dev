"use server";

import { PrismaClient } from "@prisma/client";

const prisma = new Prismaclient();

async function getDataCustomers() {
  try {
    const result = await prisma.customers.findMany();
    return result;
  } catch (error) {
    console.log("Error fetching data customers:", error);
    return [];
  } finally {
    await prisma.$disconnect();
  }
}

export default getDataCustomers;
