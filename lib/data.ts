import type { Guest } from "@/components/guest-list"

// Mock data for guests
let guests: Guest[] = [
  {
    id: "1",
    name: "John Smith",
    email: "john@example.com",
    phone: "+1 (555) 123-4567",
    status: "confirmed",
    guests: 2,
    createdAt: "2023-05-01T10:00:00Z",
  },
  {
    id: "2",
    name: "Jane Doe",
    email: "jane@example.com",
    phone: "+1 (555) 987-6543",
    status: "pending",
    guests: 3,
    createdAt: "2023-05-02T14:30:00Z",
  },
  {
    id: "3",
    name: "Robert Johnson",
    email: "robert@example.com",
    phone: "+1 (555) 456-7890",
    status: "confirmed",
    guests: 1,
    createdAt: "2023-05-03T09:15:00Z",
  },
  {
    id: "4",
    name: "Emily Wilson",
    email: "emily@example.com",
    phone: "+1 (555) 234-5678",
    status: "cancelled",
    guests: 2,
    createdAt: "2023-05-04T16:45:00Z",
  },
  {
    id: "5",
    name: "Michael Brown",
    email: "michael@example.com",
    phone: "+1 (555) 876-5432",
    status: "confirmed",
    guests: 4,
    createdAt: "2023-05-05T11:20:00Z",
  },
]

// Event configuration
const EVENT_CAPACITY = 140

// Get all guests
export function getGuests(): Guest[] {
  return guests
}

// Get guest by ID
export function getGuestById(id: string): Guest | undefined {
  return guests.find((guest) => guest.id === id)
}

// Add a new guest
export function addGuest(guestData: Omit<Guest, "id" | "createdAt">): Guest {
  const newGuest: Guest = {
    id: Math.random().toString(36).substring(2, 9),
    ...guestData,
    createdAt: new Date().toISOString(),
  }

  guests.unshift(newGuest)
  return newGuest
}

// Update guest status
export function updateGuestStatus(id: string, status: "confirmed" | "pending" | "cancelled"): Guest | undefined {
  const guestIndex = guests.findIndex((guest) => guest.id === id)

  if (guestIndex !== -1) {
    guests[guestIndex] = {
      ...guests[guestIndex],
      status,
    }
    return guests[guestIndex]
  }

  return undefined
}

// Delete a guest
export function deleteGuest(id: string): boolean {
  const initialLength = guests.length
  guests = guests.filter((guest) => guest.id !== id)
  return guests.length < initialLength
}

// Get guest statistics
export async function getGuestStats() {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 500))

  const total = guests.reduce((acc, guest) => acc + guest.guests, 0)
  const confirmed = guests.filter((guest) => guest.status === "confirmed").reduce((acc, guest) => acc + guest.guests, 0)
  const pending = guests.filter((guest) => guest.status === "pending").reduce((acc, guest) => acc + guest.guests, 0)

  return {
    total,
    confirmed,
    pending,
    capacity: EVENT_CAPACITY,
    percentFull: Math.min(100, Math.round((total / EVENT_CAPACITY) * 100)),
  }
}
