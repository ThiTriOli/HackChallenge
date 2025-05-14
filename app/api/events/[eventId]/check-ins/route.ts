import { type NextRequest, NextResponse } from "next/server"
import { getEventCheckIns, searchCheckIns } from "@/lib/db"

export async function GET(request: NextRequest, { params }: { params: { eventId: string } }) {
  try {
    const { eventId } = params
    const searchParams = request.nextUrl.searchParams
    const query = searchParams.get("query") || ""

    // Get check-ins, optionally filtered by search query
    const checkIns = query ? searchCheckIns(eventId, query) : getEventCheckIns(eventId)

    return NextResponse.json({ success: true, data: checkIns })
  } catch (error) {
    console.error("Error in get check-ins API:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
