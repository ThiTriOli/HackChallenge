import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { getGuestStats } from "@/lib/data"

export async function GuestStats() {
  const { total, confirmed, pending, capacity, percentFull } = await getGuestStats()

  return (
    <>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <div className="space-y-1">
            <CardTitle className="text-sm font-medium">Total Guests</CardTitle>
            <CardDescription>All registered guests</CardDescription>
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{total}</div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <div className="space-y-1">
            <CardTitle className="text-sm font-medium">Confirmed</CardTitle>
            <CardDescription>Guests who confirmed</CardDescription>
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{confirmed}</div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <div className="space-y-1">
            <CardTitle className="text-sm font-medium">Pending</CardTitle>
            <CardDescription>Awaiting confirmation</CardDescription>
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{pending}</div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <div className="space-y-1">
            <CardTitle className="text-sm font-medium">Capacity</CardTitle>
            <CardDescription>Event space filled</CardDescription>
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {total}/{capacity}
          </div>
          <div className="mt-2 h-2 w-full rounded-full bg-gray-200">
            <div className="h-full rounded-full bg-emerald-500" style={{ width: `${percentFull}%` }}></div>
          </div>
        </CardContent>
      </Card>
    </>
  )
}
