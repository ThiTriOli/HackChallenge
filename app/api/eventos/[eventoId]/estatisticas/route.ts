import { type NextRequest, NextResponse } from "next/server"
import { getEstatisticasEvento } from "@/lib/db"

export async function GET(_request: NextRequest, { params }: { params: { eventoId: string } }) {
  try {
    const { eventoId } = params
    const estatisticas = getEstatisticasEvento(eventoId)

    if (!estatisticas) {
      return NextResponse.json({ error: "Evento não encontrado" }, { status: 404 })
    }

    return NextResponse.json({ success: true, data: estatisticas })
  } catch (error) {
    console.error("Erro na API de estatísticas do evento:", error)
    return NextResponse.json({ error: "Erro interno do servidor" }, { status: 500 })
  }
}
