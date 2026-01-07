"use client";

import { useState, useTransition, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { editExpense } from "@/app/admin/expenses/actions";
import toast from "react-hot-toast";

interface ExpenseEditDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  expense: any | null;
}

export function ExpenseEditDialog({
  open,
  onOpenChange,
  expense,
}: ExpenseEditDialogProps) {
  const [isPending, startTransition] = useTransition();

  const [formData, setFormData] = useState({
    category: "",
    amount: "",
    description: "",
    expenseDate: "",
    paymentMethod: "",
    notes: "",
  });

  // Update form data when expense changes
  useEffect(() => {
    if (expense) {
      const date = new Date(expense.expenseDate);
      const formattedDate = date.toISOString().slice(0, 16); // Format for datetime-local input

      setFormData({
        category: expense.category || "",
        amount: expense.amount?.toString() || "",
        description: expense.description || "",
        expenseDate: formattedDate,
        paymentMethod: expense.paymentMethod || "",
        notes: expense.notes || "",
      });
    }
  }, [expense]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!expense) return;

    startTransition(async () => {
      const result = await editExpense(expense.id, {
        category: formData.category,
        amount: parseFloat(formData.amount),
        description: formData.description,
        expenseDate: new Date(formData.expenseDate),
        paymentMethod: formData.paymentMethod || undefined,
        notes: formData.notes || undefined,
      });

      if (result.success) {
        toast.success(result.message);
        onOpenChange(false);
      } else {
        toast.error(result.message);
      }
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Edit Expense</DialogTitle>
          <DialogDescription>
            Update the expense record details
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="category">Category</Label>
            <Select
              value={formData.category}
              onValueChange={(value) =>
                setFormData({ ...formData, category: value })
              }
            >
              <SelectTrigger id="category">
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="supplies">Supplies</SelectItem>
                <SelectItem value="utilities">Utilities</SelectItem>
                <SelectItem value="maintenance">Maintenance</SelectItem>
                <SelectItem value="commission">Comission</SelectItem>
                <SelectItem value="fuel">Fuel</SelectItem>
                <SelectItem value="electricity">Electricity</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="amount">Amount (₦)</Label>
            <Input
              id="amount"
              type="number"
              step="0.01"
              value={formData.amount}
              onChange={(e) =>
                setFormData({ ...formData, amount: e.target.value })
              }
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              required
              rows={3}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="expenseDate">Expense Date & Time</Label>
            <Input
              id="expenseDate"
              type="datetime-local"
              value={formData.expenseDate}
              onChange={(e) =>
                setFormData({ ...formData, expenseDate: e.target.value })
              }
              required
            />
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
  );
}
