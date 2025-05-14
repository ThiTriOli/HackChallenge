import { type NextRequest, NextResponse } from "next/server"
import { getCheckInsEvento, pesquisarCheckIns } from "@/lib/db"

export async function GET(request: NextRequest, { params }: { params: { eventoId: string } }) {
  try {
    const { eventoId } = params
    const searchParams = request.nextUrl.searchParams
    const consulta = searchParams.get("consulta") || ""

    // Obter check-ins, opcionalmente filtrados por consulta de pesquisa
    const checkIns = consulta ? pesquisarCheckIns(eventoId, consulta) : getCheckInsEvento(eventoId)

    return NextResponse.json({ success: true, data: checkIns })
  } catch (error) {
    console.error("Erro na API de obter check-ins:", error)
    return NextResponse.json({ error: "Erro interno do servidor" }, { status: 500 })
  }
}
