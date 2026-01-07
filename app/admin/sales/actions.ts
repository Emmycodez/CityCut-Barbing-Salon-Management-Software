"use server"

import { revalidatePath } from "next/cache"
import prisma from "@/lib/prisma"

export async function deleteSale(saleId: string) {
  try {
    await prisma.serviceRecord.delete({
      where: {
        id: saleId,
      },
    })

    // Revalidate the sales page to show updated data
    revalidatePath("/admin/sales")

    return { success: true, message: "Sale deleted successfully" }
  } catch (error) {
    console.error("Error deleting sale:", error)
    return { success: false, message: "Failed to delete sale" }
  }
}


interface EditServiceData {
  serviceType: string
  barberName: string
  amountPaid: number
  paymentMethod: "CASH" | "POS" | "TRANSFER" | "OTHER"
  serviceDate: Date
}


export async function editService(serviceId: string, data: EditServiceData) {
  try {
    await prisma.serviceRecord.update({
      where: {
        id: serviceId,
      },
      data: {
        serviceType: data.serviceType,
        barberName: data.barberName,
        amountPaid: data.amountPaid,
        paymentMethod: data.paymentMethod,
        serviceDate: data.serviceDate,
      },
    })

    // Revalidate the sales page to show updated data
    revalidatePath("/sales")
    revalidatePath("/admin/sales")

    return { success: true, message: "Service updated successfully" }
  } catch (error) {
    console.error("Error updating service:", error)
    return { success: false, message: "Failed to update service" }
  }
}