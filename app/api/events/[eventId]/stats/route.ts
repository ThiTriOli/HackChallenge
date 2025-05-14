import { type NextRequest, NextResponse } from "next/server"
import { getEventStats } from "@/lib/db"

export async function GET(_request: NextRequest, { params }: { params: { eventId: string } }) {
  try {
    const { eventId } = params
    const stats = getEventStats(eventId)

    if (!stats) {
      return NextResponse.json({ error: "Event not found" }, { status: 404 })
    }

    return NextResponse.json({ success: true, data: stats })
  } catch (error) {
    console.error("Error in get event stats API:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
