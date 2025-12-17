"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Scissors, DollarSign, Receipt, LogOut, Plus } from "lucide-react";
import { ServiceRecordDialog } from "./service-record-dialog";
import { ExpenseRecordDialog } from "./expense-record-dialog";

export function SalesDashboard() {
  const [showServiceDialog, setShowServiceDialog] = useState(false);
  const [showExpenseDialog, setShowExpenseDialog] = useState(false);

  // Mock data
  const todaySales = 850.0;
  const todayServices = 12;
  const todayExpenses = 150.0;

  return (
    <div className="min-h-screen flex flex-col ">
      {/* Header */}
      {/* Header */}
      <header className="border-b border-border bg-card sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center">
                <Scissors className="w-6 h-6 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-lg font-bold text-foreground">
                  Sales Dashboard
                </h1>
                <p className="text-xs text-muted-foreground">
                  CityCut Management
                </p>
              </div>
            </div>
            <Button asChild variant="ghost" size="sm">
              <Link href="/login">
                <LogOut className="w-4 h-4 mr-2" />
                Sign Out
              </Link>
            </Button>
          </div>
        </div>
      </header>

      <main className="flex-1 container mx-auto px-4 py-6 md:py-8 bg-background text-foreground">
        {/* Stats Cards */}
        <div className="grid gap-4 md:grid-cols-3 mb-6">
          <Card className="border-border bg-card">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Today's Revenue
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2">
                <DollarSign className="w-5 h-5 text-primary" />
                <span className="text-3xl font-bold text-foreground">
                  ${todaySales.toFixed(2)}
                </span>
              </div>
            </CardContent>
          </Card>

          <Card className="border-border bg-card">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Services Completed
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2">
                <Scissors className="w-5 h-5 text-primary" />
                <span className="text-3xl font-bold text-foreground">
                  {todayServices}
                </span>
              </div>
            </CardContent>
          </Card>

          <Card className="border-border bg-card">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Today's Expenses
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2">
                <Receipt className="w-5 h-5 text-destructive" />
                <span className="text-3xl font-bold text-foreground">
                  ${todayExpenses.toFixed(2)}
                </span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Action Buttons */}
        <div className="grid gap-4 md:grid-cols-2 mb-6">
          <Button
            size="lg"
            className="h-auto py-6 text-base cursor-pointer"
            onClick={() => setShowServiceDialog(true)}
          >
            <Plus className="w-5 h-5 mr-2" />
            Record Service
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="h-auto py-6 text-base bg-transparent cursor-pointer"
            onClick={() => setShowExpenseDialog(true)}
          >
            <Plus className="w-5 h-5 mr-2" />
            Record Expense
          </Button>
        </div>

        {/* Recent Activity */}
        <Card className="border-border bg-card">
          <CardHeader>
            <CardTitle>Today's Activity</CardTitle>
            <CardDescription>Recent services and transactions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[1, 2, 3, 4, 5].map((_, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between py-3 border-b border-border last:border-0"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-background text-foreground flex items-center justify-center">
                      <Scissors className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium text-foreground">
                        Haircut & Beard Trim
                      </p>
                      <p className="text-sm text-muted-foreground">
                        John Smith • Barber: Mike
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-foreground">$45.00</p>
                    <p className="text-xs text-muted-foreground">Cash</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </main>

      {/* Dialogs */}
      <ServiceRecordDialog
        open={showServiceDialog}
        onOpenChange={setShowServiceDialog}
      />
      <ExpenseRecordDialog
        open={showExpenseDialog}
        onOpenChange={setShowExpenseDialog}
      />
    </div>
  );
}
