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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { editService } from "@/app/admin/sales/actions";
import toast from "react-hot-toast";

interface ServiceEditDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  service: any | null;
}

const servicesType = [
  { id: 1, service: "Standard Haircut" },
  { id: 2, service: "Premium/Celebrity Haircut" },
  { id: 3, service: "Children/Student Haircut" },
  { id: 4, service: "Beard Trim & Shaping" },
  { id: 5, service: "Mustache Grooming" },
  { id: 6, service: "Straight Razor Hot Shave" },
  { id: 7, service: "Hair Dye & Tinting (Black/Colors)" },
  { id: 8, service: "Beard Dye/Gray Blending" },
  { id: 9, service: "Dreadlocks (Fixing & Relocking)" },
  { id: 10, service: "Scalp Massage & Treatment" },
  { id: 11, service: "Hair Washing & Setting" },
  { id: 12, service: "Relaxer & Texturizer Application" },
  { id: 13, service: "Facial Therapy (Plain or Fruit Facials)" },
  { id: 14, service: "Manicure & Pedicure" },
  { id: 15, service: "Home Service Barbing" },
  { id: 16, service: "Ear & Nose Hair Trimming" },
  { id: 17, service: "Eyebrow Shaping/Threading" },
  { id: 18, service: "Bumps Treatment (Aftershave/Creme)" },
  { id: 19, service: "Toupee/Hair Replacement Installation" },
  { id: 20, service: "Braiding for Men (Cornrows/Twists)" },
];

type PaymentMethod = "CASH" | "POS" | "TRANSFER" | "OTHER";
interface EditServiceForm {
  serviceType: string;
  barberName: string;
  amountPaid: string; // form input value is string
  paymentMethod: PaymentMethod;
  serviceDate: string;
}

export function ServiceEditDialog({
  open,
  onOpenChange,
  service,
}: ServiceEditDialogProps) {
  const [isPending, startTransition] = useTransition();

  const [formData, setFormData] = useState<EditServiceForm>({
    serviceType: "",
    barberName: "",
    amountPaid: "",
    paymentMethod: "CASH",
    serviceDate: "",
  });

  // Update form data when service changes
  useEffect(() => {
    if (service) {
      const date = new Date(service.serviceDate);
      const formattedDate = date.toISOString().slice(0, 16); // Format for datetime-local input

      setFormData({
        serviceType: service.serviceType || "",
        barberName: service.barberName || "",
        amountPaid: service.amountPaid?.toString() || "",
        paymentMethod: service.paymentMethod || "",
        serviceDate: formattedDate,
      });
    }
  }, [service]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!service) return;

    startTransition(async () => {
      const result = await editService(service.id, {
        serviceType: formData.serviceType,
        barberName: formData.barberName,
        amountPaid: parseFloat(formData.amountPaid),
        paymentMethod: formData.paymentMethod,
        serviceDate: new Date(formData.serviceDate),
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
          <DialogTitle>Edit Service</DialogTitle>
          <DialogDescription>
            Update the service record details
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="serviceType">Service Type</Label>
            <Select
              value={formData.serviceType}
              onValueChange={(value) =>
                setFormData({ ...formData, serviceType: value })
              }
            >
              <SelectTrigger id="serviceType">
                <SelectValue placeholder="Select service" />
              </SelectTrigger>
              <SelectContent>
                {servicesType.map((servType) => (
                  <SelectItem
                    key={servType.id}
                    value={servType.service.toLowerCase()}
                  >
                    {servType.service}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="barberName">Barber Name</Label>
            <Input
              id="barberName"
              value={formData.barberName}
              onChange={(e) =>
                setFormData({ ...formData, barberName: e.target.value })
              }
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="amountPaid">Amount Paid (₦)</Label>
            <Input
              id="amountPaid"
              type="number"
              step="0.01"
              value={formData.amountPaid}
              onChange={(e) =>
                setFormData({ ...formData, amountPaid: e.target.value })
              }
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="paymentMethod">Payment Method</Label>
            <Select
              value={formData.paymentMethod}
              onValueChange={(value) =>
                setFormData({
                  ...formData,
                  paymentMethod: value as PaymentMethod,
                })
              }
            >
              <SelectTrigger id="paymentMethod">
                <SelectValue placeholder="Select payment method" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="CASH">Cash</SelectItem>
                <SelectItem value="TRANSFER">Transfer</SelectItem>
                <SelectItem value="POS">POS</SelectItem>
                <SelectItem value="OTHER">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="serviceDate">Service Date & Time</Label>
            <Input
              id="serviceDate"
              type="datetime-local"
              value={formData.serviceDate}
              onChange={(e) =>
                setFormData({ ...formData, serviceDate: e.target.value })
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
