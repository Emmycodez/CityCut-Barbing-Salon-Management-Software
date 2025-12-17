"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface ServiceRecordDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function ServiceRecordDialog({ open, onOpenChange }: ServiceRecordDialogProps) {
  const [customerName, setCustomerName] = useState("")
  const [customerPhone, setCustomerPhone] = useState("")
  const [barberName, setBarberName] = useState("")
  const [serviceType, setServiceType] = useState("")
  const [amount, setAmount] = useState("")
  const [paymentMethod, setPaymentMethod] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission
    console.log({ customerName, customerPhone, barberName, serviceType, amount, paymentMethod })
    onOpenChange(false)
    // Reset form
    setCustomerName("")
    setCustomerPhone("")
    setBarberName("")
    setServiceType("")
    setAmount("")
    setPaymentMethod("")
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto bg-card">
        <DialogHeader>
          <DialogTitle>Record Service</DialogTitle>
          <DialogDescription>Enter the details for the completed service</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="customerName">Customer Name</Label>
            <Input
              id="customerName"
              placeholder="John Smith"
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
              required
              className="bg-secondary"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="customerPhone">Customer Phone</Label>
            <Input
              id="customerPhone"
              type="tel"
              placeholder="(555) 123-4567"
              value={customerPhone}
              onChange={(e) => setCustomerPhone(e.target.value)}
              required
              className="bg-secondary"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="barberName">Barber Name</Label>
            <Select value={barberName} onValueChange={setBarberName} required>
              <SelectTrigger id="barberName" className="bg-secondary">
                <SelectValue placeholder="Select barber" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="mike">Mike Johnson</SelectItem>
                <SelectItem value="sarah">Sarah Williams</SelectItem>
                <SelectItem value="david">David Brown</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="serviceType">Service Type</Label>
            <Select value={serviceType} onValueChange={setServiceType} required>
              <SelectTrigger id="serviceType" className="bg-secondary">
                <SelectValue placeholder="Select service" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="haircut">Haircut</SelectItem>
                <SelectItem value="beard">Beard Trim</SelectItem>
                <SelectItem value="combo">Haircut & Beard</SelectItem>
                <SelectItem value="shave">Hot Shave</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="amount">Amount</Label>
            <Input
              id="amount"
              type="number"
              step="0.01"
              placeholder="0.00"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              required
              className="bg-secondary"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="paymentMethod">Payment Method</Label>
            <Select value={paymentMethod} onValueChange={setPaymentMethod} required>
              <SelectTrigger id="paymentMethod" className="bg-secondary">
                <SelectValue placeholder="Select payment method" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="cash">Cash</SelectItem>
                <SelectItem value="card">Card</SelectItem>
                <SelectItem value="mobile">Mobile Payment</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex gap-3 pt-4">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)} className="flex-1">
              Cancel
            </Button>
            <Button type="submit" className="flex-1">
              Record Service
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
