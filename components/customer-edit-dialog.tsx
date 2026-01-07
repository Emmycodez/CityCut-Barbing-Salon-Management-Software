"use client"

import { useState, useTransition, useEffect } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { editCustomer } from "@/app/admin/customers/actions" 
import toast from "react-hot-toast"

interface CustomerEditDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  customer: any | null
}

export function CustomerEditDialog({
  open,
  onOpenChange,
  customer,
}: CustomerEditDialogProps) {
  const [isPending, startTransition] = useTransition()

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
  })

  // Update form data when customer changes
  useEffect(() => {
    if (customer) {
      setFormData({
        name: customer.name || "",
        phone: customer.phone || "",
      })
    }
  }, [customer])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!customer) return

    // Basic phone validation
    if (formData.phone && !/^[0-9+\-\s()]+$/.test(formData.phone)) {
      toast.error("Please enter a valid phone number")
      return
    }

    startTransition(async () => {
      const result = await editCustomer(customer.id, {
        name: formData.name,
        phone: formData.phone,
      })

      if (result.success) {
        toast.success(result.message)
        onOpenChange(false)
      } else {
        toast.error(result.message)
      }
    })
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Edit Customer</DialogTitle>
          <DialogDescription>
            Update customer information
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Customer Name</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              placeholder="Enter customer name"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone">Phone Number</Label>
            <Input
              id="phone"
              type="tel"
              value={formData.phone}
              onChange={(e) =>
                setFormData({ ...formData, phone: e.target.value })
              }
              placeholder="Enter phone number"
              required
            />
            <p className="text-xs text-muted-foreground">
              Format: +234XXXXXXXXXX or 0XXXXXXXXXX
            </p>
          </div>

          <div className="p-3 bg-secondary/50 rounded-lg space-y-1">
            <p className="text-sm font-medium text-foreground">Customer Stats</p>
            <div className="grid grid-cols-2 gap-2 text-xs text-muted-foreground">
              <div>
                <span className="font-medium">Total Visits:</span> {customer?.visits || 0}
              </div>
              <div>
                <span className="font-medium">Total Spent:</span> ₦{customer?.totalSpent?.toFixed(2) || "0.00"}
              </div>
            </div>
            <p className="text-xs text-muted-foreground italic mt-2">
              Note: Service history cannot be edited from here
            </p>
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={isPending}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isPending}>
              {isPending ? "Saving..." : "Save Changes"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}