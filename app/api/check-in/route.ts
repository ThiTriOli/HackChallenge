import { type NextRequest, NextResponse } from "next/server"
import { adicionarCheckIn, convidadoJaFezCheckIn } from "@/lib/db"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { eventoId, email, qrCodeData } = body

    // Validar entrada
    if (!eventoId || !email) {
      return NextResponse.json({ error: "ID do evento e email são obrigatórios" }, { status: 400 })
    }

    // Validar formato de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: "Formato de email inválido" }, { status: 400 })
    }

    // Verificar se o convidado já fez check-in
    if (convidadoJaFezCheckIn(eventoId, email)) {
      return NextResponse.json({ error: "Este email já realizou check-in" }, { status: 409 })
    }

    // Adicionar o check-in
    const checkIn = adicionarCheckIn(eventoId, email, qrCodeData)

    if (!checkIn) {
      return NextResponse.json({ error: "Falha ao realizar check-in do convidado" }, { status: 500 })
    }

    return NextResponse.json({ success: true, data: checkIn })
  } catch (error) {
    console.error("Erro na API de check-in:", error)
    return NextResponse.json({ error: "Erro interno do servidor" }, { status: 500 })
  }
}
