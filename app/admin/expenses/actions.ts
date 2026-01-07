"use server"

import { revalidatePath } from "next/cache"
import prisma from "@/lib/prisma"

export async function deleteExpense(expenseId: string) {
  try {
    await prisma.expense.delete({
      where: {
        id: expenseId,
      },
    })

    // Revalidate the expenses page to show updated data
    revalidatePath("/admin/expenses")

    return { success: true, message: "Expense deleted successfully" }
  } catch (error) {
    console.error("Error deleting expense:", error)
    return { success: false, message: "Failed to delete expense" }
  }
}



interface EditExpenseData {
  category: string
  amount: number
  description: string
  expenseDate: Date
  paymentMethod?: string
  notes?: string
}

export async function editExpense(expenseId: string, data: EditExpenseData) {
  try {
    await prisma.expense.update({
      where: {
        id: expenseId,
      },
      data: {
        category: data.category,
        amount: data.amount,
        description: data.description,
        expenseDate: data.expenseDate,
       
      },
    })

    // Revalidate the sales page to show updated data
    revalidatePath("/sales")
    revalidatePath("/admin/expenses")

    return { success: true, message: "Expense updated successfully" }
  } catch (error) {
    console.error("Error updating expense:", error)
    return { success: false, message: "Failed to update expense" }
  }
}