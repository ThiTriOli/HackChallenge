"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { CalendarDays, Mail, Phone, Users } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import type { Guest } from "@/components/guest-list"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/hooks/use-toast"
import { deleteGuest, updateGuestStatus } from "@/lib/data"

interface GuestDetailsProps {
  guest: Guest
}

export function GuestDetails({ guest }: GuestDetailsProps) {
  const { toast } = useToast()
  const router = useRouter()
  const [isDeleting, setIsDeleting] = useState(false)
  const [isUpdating, setIsUpdating] = useState(false)
  const [open, setOpen] = useState(false)

  const handleStatusChange = async (status: "confirmed" | "pending" | "cancelled") => {
    setIsUpdating(true)

    try {
      updateGuestStatus(guest.id, status)

      toast({
        title: "Status updated",
        description: `Guest status changed to ${status}.`,
      })

      router.refresh()
    } catch (error) {
      toast({
        title: "Error",
        description: "There was a problem updating the status.",
        variant: "destructive",
      })
    } finally {
      setIsUpdating(false)
    }
  }

  const handleDelete = async () => {
    setIsDeleting(true)

    try {
      deleteGuest(guest.id)

      toast({
        title: "Guest deleted",
        description: "The guest has been removed from your event.",
      })

      router.push("/")
    } catch (error) {
      toast({
        title: "Error",
        description: "There was a problem deleting the guest.",
        variant: "destructive",
      })
    } finally {
      setIsDeleting(false)
      setOpen(false)
    }
  }

  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-medium">Guest Information</h3>
          <Badge
            variant={guest.status === "confirmed" ? "default" : guest.status === "pending" ? "outline" : "destructive"}
          >
            {guest.status}
          </Badge>
        </div>
        <div className="grid gap-4">
          <div className="flex items-center gap-2">
            <Mail className="h-4 w-4 text-muted-foreground" />
            <span>{guest.email}</span>
          </div>
          <div className="flex items-center gap-2">
            <Phone className="h-4 w-4 text-muted-foreground" />
            <span>{guest.phone}</span>
          </div>
          <div className="flex items-center gap-2">
            <Users className="h-4 w-4 text-muted-foreground" />
            <span>
              {guest.guests} {guest.guests === 1 ? "person" : "people"}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <CalendarDays className="h-4 w-4 text-muted-foreground" />
            <span>Added on {new Date(guest.createdAt).toLocaleDateString()}</span>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-medium">Actions</h3>
        <div className="flex flex-wrap gap-2">
          <Button
            variant="outline"
            onClick={() => handleStatusChange("confirmed")}
            disabled={guest.status === "confirmed" || isUpdating}
          >
            Mark as Confirmed
          </Button>
          <Button
            variant="outline"
            onClick={() => handleStatusChange("pending")}
            disabled={guest.status === "pending" || isUpdating}
          >
            Mark as Pending
          </Button>
          <Button
            variant="outline"
            onClick={() => handleStatusChange("cancelled")}
            disabled={guest.status === "cancelled" || isUpdating}
          >
            Mark as Cancelled
          </Button>

          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button variant="destructive">Delete Guest</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Are you sure?</DialogTitle>
                <DialogDescription>
                  This action cannot be undone. This will permanently delete the guest and remove their data from the
                  system.
                </DialogDescription>
              </DialogHeader>
              <DialogFooter>
                <Button variant="outline" onClick={() => setOpen(false)}>
                  Cancel
                </Button>
                <Button variant="destructive" onClick={handleDelete} disabled={isDeleting}>
                  {isDeleting ? "Deleting..." : "Delete"}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </div>
  )
}
