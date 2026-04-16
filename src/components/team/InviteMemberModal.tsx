"use client";

import React, { useState } from "react";
import { UserPlus, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
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
import { useInviteMemberMutation } from "@/services/endpoints/teamApi";

interface InviteMemberModalProps {
  onInviteSuccess?: () => void;
}

export function InviteMemberModal({ onInviteSuccess }: InviteMemberModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "viewer",
  });

  const [inviteMember, { isLoading }] = useInviteMemberMutation();

  const handleInviteSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await inviteMember(formData).unwrap();

      setIsOpen(false);
      setFormData({ name: "", email: "", role: "viewer" });

      if (onInviteSuccess) onInviteSuccess();
    } catch (err) {
      console.error("Invite failed:", err);
    }
  };

  return (
      <Dialog open={isOpen} onOpenChange={setIsOpen}>

        {/* ✅ Responsive Trigger Button */}
        <DialogTrigger asChild>
          <Button
              size="sm"
              variant="yellow"
              className="w-full sm:w-auto px-3 sm:px-4 py-2 text-xs sm:text-sm border-none font-semibold flex items-center justify-center"
          >
            <UserPlus className="h-4 w-4 sm:mr-2" />
            <span className="hidden sm:inline">Invite Member</span>
          </Button>
        </DialogTrigger>

        {/* ✅ Modal */}
        <DialogContent className="sm:max-w-[425px] bg-white dark:bg-[#121212] border-none shadow-2xl">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold">
              Invite Team Member
            </DialogTitle>
            <DialogDescription>
              Send an invitation to join your workspace.
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleInviteSubmit} className="space-y-4 py-4">

            <div className="grid gap-2">
              <Label htmlFor="name">Full Name</Label>
              <Input
                  id="name"
                  placeholder="e.g. John Doe"
                  value={formData.name}
                  onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                  }
                  required
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="email">Email Address</Label>
              <Input
                  id="email"
                  type="email"
                  placeholder="john@example.com"
                  value={formData.email}
                  onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                  }
                  required
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="role">Assign Role</Label>
              <Select
                  value={formData.role}
                  onValueChange={(v) =>
                      setFormData({ ...formData, role: v })
                  }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="viewer">Viewer</SelectItem>
                  <SelectItem value="editor">Editor</SelectItem>
                  <SelectItem value="admin">Admin</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <DialogFooter className="pt-4">
              <Button
                  type="submit"
                  variant="yellow"
                  className="w-full border-none font-bold h-11"
                  disabled={isLoading}
              >
                {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Sending...
                    </>
                ) : (
                    "Send Invitation"
                )}
              </Button>
            </DialogFooter>

          </form>
        </DialogContent>
      </Dialog>
  );
}