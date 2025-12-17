import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Scissors, TrendingUp, Users, LogIn } from "lucide-react"

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      {/* Header */}
      <header className="border-b border-border bg-background text-foreground">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center">
              <Scissors className="w-6 h-6 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-foreground">CityCut</h1>
              <p className="text-xs text-muted-foreground">Management System</p>
            </div>
          </div>
          <Button asChild size="sm">
            <Link href="/login">
              <LogIn className="w-4 h-4 mr-2" />
              Sign In
            </Link>
          </Button>
        </div>
      </header>

      {/* Hero Section */}
      <main className="flex-1 container mx-auto px-4 py-12 md:py-20 bg-background text-foreground">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-balance">Streamline Your Barbershop Operations</h2>
          <p className="text-lg md:text-xl text-muted-foreground mb-8 text-pretty">
            Professional management system to record services, track expenses, and monitor revenue with ease.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="text-base">
              <Link href="/sales">Sales Dashboard</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="text-base bg-transparent">
              <Link href="/admin">Admin Dashboard</Link>
            </Button>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid gap-6 md:grid-cols-3 max-w-5xl mx-auto">
          <Card className="border-border bg-card">
            <CardHeader>
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                <Scissors className="w-6 h-6 text-primary" />
              </div>
              <CardTitle>Service Recording</CardTitle>
              <CardDescription>
                Quick and easy service entry with customer details, barber assignment, and payment tracking
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="border-border bg-card">
            <CardHeader>
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                <TrendingUp className="w-6 h-6 text-primary" />
              </div>
              <CardTitle>Revenue Analytics</CardTitle>
              <CardDescription>
                Real-time sales summaries, expense tracking, and comprehensive revenue monitoring
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="border-border bg-card">
            <CardHeader>
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                <Users className="w-6 h-6 text-primary" />
              </div>
              <CardTitle>Customer Management</CardTitle>
              <CardDescription>
                Maintain detailed customer records with service history and contact information
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-border py-6">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          <p>© 2025 CityCut BarberShop Management System. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
