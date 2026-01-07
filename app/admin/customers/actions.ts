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


interface EditCustomerData {
  name: string
  phone: string
}

export async function editCustomer(customerId: string, data: EditCustomerData) {
  try {
    await prisma.customer.update({
      where: {
        id: customerId,
      },
      data: {
        name: data.name,
        phone: data.phone,
      },
    })

    // Revalidate the customers page to show updated data
    revalidatePath("/admin/customers")

    return { success: true, message: "Customer updated successfully" }
  } catch (error) {
    console.error("Error updating customer:", error)
    return { success: false, message: "Failed to update customer" }
  }
}