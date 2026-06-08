import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { toast } from "sonner";
import { useAuth } from "@/hooks/use-auth";
import { addMockLead } from "@/lib/queries";

export function NewLeadDialog({ trigger }: { trigger?: React.ReactNode }) {
  const { user } = useAuth();
  const qc = useQueryClient();
  const [open, setOpen] = useState(false);
  const [busy, setBusy] = useState(false);
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    source: "Website",
    budget: "",
    temperature: "warm" as "hot" | "warm" | "cold",
  });

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!user) return;
    setBusy(true);
    try {
      await addMockLead({
        name: form.name,
        phone: form.phone || null,
        email: form.email || null,
        source: form.source,
        budget: form.budget || null,
        temperature: form.temperature,
        stage: "new",
        projects: { name: "Aurelia Heights" }
      });
      toast.success("Lead added");
      qc.invalidateQueries({ queryKey: ["leads"] });
      qc.invalidateQueries({ queryKey: ["dashboard-stats"] });
      setOpen(false);
      setForm({ name: "", phone: "", email: "", source: "Website", budget: "", temperature: "warm" });
    } catch (err: any) {
      toast.error(err?.message || "Failed to add lead");
    } finally {
      setBusy(false);
    }
  }


  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger ?? (
          <Button size="sm">
            Add Lead
          </Button>
        )}
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add new lead</DialogTitle>
        </DialogHeader>
        <form onSubmit={submit} className="space-y-4">
          <div className="space-y-1.5">
            <Label htmlFor="lname">Customer name *</Label>
            <Input id="lname" required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <Label htmlFor="lphone">Phone</Label>
              <Input id="lphone" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="lemail">Email</Label>
              <Input id="lemail" type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <Label>Source</Label>
              <Select value={form.source} onValueChange={(v) => setForm({ ...form, source: v })}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  {["Website","Instagram","Facebook","WhatsApp","Walk-in","Referral","Landing Page"].map((s) => (
                    <SelectItem key={s} value={s}>{s}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1.5">
              <Label>Temperature</Label>
              <Select value={form.temperature} onValueChange={(v) => setForm({ ...form, temperature: v as "hot" | "warm" | "cold" })}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="hot">Hot</SelectItem>
                  <SelectItem value="warm">Warm</SelectItem>
                  <SelectItem value="cold">Cold</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="lbudget">Budget</Label>
            <Input id="lbudget" placeholder="e.g. ₹2.5 Cr" value={form.budget} onChange={(e) => setForm({ ...form, budget: e.target.value })} />
          </div>
          <DialogFooter>
            <Button type="submit" disabled={busy}>{busy ? "Saving…" : "Add lead"}</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
