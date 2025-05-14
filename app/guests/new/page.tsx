import { AddGuestForm } from "@/components/add-guest-form"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { ChevronLeft } from "lucide-react"

export default function NewGuestPage() {
  return (
    <main className="container py-10">
      <div className="flex flex-col gap-8">
        <div className="flex items-center gap-2">
          <Link href="/">
            <Button variant="ghost" size="icon">
              <ChevronLeft className="h-4 w-4" />
            </Button>
          </Link>
          <h1 className="text-3xl font-bold tracking-tight">Add New Guest</h1>
        </div>

        <Card className="max-w-2xl">
          <CardHeader>
            <CardTitle>Guest Information</CardTitle>
            <CardDescription>Enter the details of the new guest you want to add to your event.</CardDescription>
          </CardHeader>
          <CardContent>
            <AddGuestForm />
          </CardContent>
        </Card>
      </div>
    </main>
  )
}
