import { type NextRequest, NextResponse } from "next/server"
import { getCheckInsEvento } from "@/lib/db"
import { cookies } from "next/headers"

export async function GET(request: NextRequest) {
  // Verificar autenticação
  const cookieStore = cookies()
  const authCookie = cookieStore.get("admin_auth")

  if (authCookie?.value !== "adiministrador@gmail.com") {
    return NextResponse.json({ error: "Não autorizado" }, { status: 401 })
  }

  const searchParams = request.nextUrl.searchParams
  const eventoId = searchParams.get("eventoId") || "evento-001"

  // Obter check-ins
  const checkIns = getCheckInsEvento(eventoId)

  // Criar cabeçalho do CSV
  const cabecalho = ["Email", "Horário de Check-in", "QR Code"]

  // Criar linhas de dados
  const linhas = checkIns.map((checkIn) => [
    checkIn.email,
    new Date(checkIn.horarioCheckIn).toLocaleString("pt-BR"),
    checkIn.qrCodeData || "N/A",
  ])

  // Combinar cabeçalho e linhas
  const conteudoCSV = [cabecalho.join(","), ...linhas.map((linha) => linha.join(","))].join("\n")

  // Retornar como arquivo CSV para download
  return new NextResponse(conteudoCSV, {
    headers: {
      "Content-Type": "text/csv;charset=utf-8",
      "Content-Disposition": `attachment; filename=check-ins-evento-${eventoId}-${new Date().toISOString().split("T")[0]}.csv`,
    },
  })
}
