"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Users, MessageCircle, Phone } from "lucide-react"

// Mock customer data
const mockCustomers = [
  {
    id: 1,
    name: "John Smith",
    phone: "5551234567",
    visits: 12,
    lastVisit: "Dec 15, 2025",
    totalSpent: 540.0,
  },
  {
    id: 2,
    name: "David Lee",
    phone: "5552345678",
    visits: 8,
    lastVisit: "Dec 14, 2025",
    totalSpent: 360.0,
  },
  {
    id: 3,
    name: "Michael Brown",
    phone: "5553456789",
    visits: 15,
    lastVisit: "Dec 16, 2025",
    totalSpent: 675.0,
  },
  // Add more mock data
  ...Array.from({ length: 15 }, (_, i) => ({
    id: i + 4,
    name: `Customer ${i + 4}`,
    phone: `555${Math.floor(Math.random() * 9000000 + 1000000)}`,
    visits: Math.floor(Math.random() * 20 + 1),
    lastVisit: `Dec ${Math.floor(Math.random() * 17 + 1)}, 2025`,
    totalSpent: Math.floor(Math.random() * 1000 + 100),
  })),
]

export function CustomerRecords() {
  const handleWhatsApp = (phone: string, name: string) => {
    // Remove non-numeric characters and format for WhatsApp
    const cleanPhone = phone.replace(/\D/g, "")
    const message = encodeURIComponent(`Hello ${name}, thank you for choosing CityCut BarberShop!`)
    window.open(`https://wa.me/${cleanPhone}?text=${message}`, "_blank")
  }

  const handleCall = (phone: string) => {
    window.location.href = `tel:${phone}`
  }

  return (
    <div className="p-4 md:p-6 lg:p-8 space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl md:text-3xl font-bold text-foreground">Customer Records</h2>
        <p className="text-muted-foreground">All registered customers and their service history</p>
      </div>

      {/* Customers List */}
      <Card className="border-border bg-card">
        <CardHeader>
          <CardTitle>All Customers</CardTitle>
          <CardDescription>Showing {mockCustomers.length} customers</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {mockCustomers.map((customer) => (
              <div
                key={customer.id}
                className="flex flex-col md:flex-row md:items-center justify-between gap-3 py-3 px-4 rounded-lg bg-secondary/50 hover:bg-secondary transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0">
                    <Users className="w-5 h-5 text-accent" />
                  </div>
                  <div>
                    <p className="font-medium text-foreground">{customer.name}</p>
                    <p className="text-sm text-muted-foreground">{customer.phone}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 ml-13 md:ml-0 flex-wrap">
                  <div className="text-left md:text-right">
                    <p className="text-sm font-semibold text-foreground">{customer.visits} visits</p>
                    <p className="text-xs text-muted-foreground">Last: {customer.lastVisit}</p>
                  </div>
                  <div className="text-left md:text-right min-w-[80px]">
                    <p className="text-sm font-semibold text-foreground">${customer.totalSpent.toFixed(2)}</p>
                    <p className="text-xs text-muted-foreground">Total spent</p>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      className="bg-green-500/10 hover:bg-green-500/20 border-green-500/30"
                      onClick={() => handleWhatsApp(customer.phone, customer.name)}
                    >
                      <MessageCircle className="w-4 h-4 mr-1" />
                      WhatsApp
                    </Button>
                    <Button size="sm" variant="outline" onClick={() => handleCall(customer.phone)}>
                      <Phone className="w-4 h-4 mr-1" />
                      Call
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
