import { notFound } from "next/navigation"
import Link from "next/link"
import { ChevronLeft } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { GuestDetails } from "@/components/guest-details"
import { getGuestById } from "@/lib/data"

export default async function GuestPage({ params }: { params: { id: string } }) {
  const guest = await getGuestById(params.id)

  if (!guest) {
    notFound()
  }

  return (
    <main className="container py-10">
      <div className="flex flex-col gap-8">
        <div className="flex items-center gap-2">
          <Link href="/">
            <Button variant="ghost" size="icon">
              <ChevronLeft className="h-4 w-4" />
            </Button>
          </Link>
          <h1 className="text-3xl font-bold tracking-tight">Guest Details</h1>
        </div>

        <Card className="max-w-2xl">
          <CardHeader>
            <CardTitle>{guest.name}</CardTitle>
            <CardDescription>View and manage guest information</CardDescription>
          </CardHeader>
          <CardContent>
            <GuestDetails guest={guest} />
          </CardContent>
        </Card>
      </div>
    </main>
  )
}
