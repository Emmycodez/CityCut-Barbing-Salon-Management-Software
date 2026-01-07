"use server"

import { revalidatePath } from "next/cache"
import prisma from "@/lib/prisma"

export async function deleteCustomer(customerId: string) {
  try {
    // Delete the customer and all related service records (cascade delete)
    await prisma.customer.delete({
      where: {
        id: customerId,
      },
    })

    // Revalidate the customers page to show updated data
    revalidatePath("/admin/customers")

    return { success: true, message: "Customer deleted successfully" }
  } catch (error) {
    console.error("Error deleting customer:", error)
    return { success: false, message: "Failed to delete customer" }
  }
}