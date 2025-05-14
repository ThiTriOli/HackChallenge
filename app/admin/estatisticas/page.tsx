import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import { getEstatisticasEvento } from "@/lib/db"
import Link from "next/link"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"

// Função para verificar autenticação (server-side only)
function getIsAuthenticated() {
  const cookieStore = cookies()
  const authCookie = cookieStore.get("admin_auth")
  return authCookie?.value === "adiministrador@gmail.com"
}

export default function EstatisticasPage() {
  // Verificar autenticação
  const isAuthenticated = getIsAuthenticated()
  if (!isAuthenticated) {
    redirect("/admin/login")
  }

  // Obter dados do servidor
  const eventoId = "evento-001"
  const estatisticas = getEstatisticasEvento(eventoId)

  // Função para formatar data
  const formatarData = (dataString: string) => {
    const data = new Date(dataString)
    return new Intl.DateTimeFormat("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    }).format(data)
  }

  return (
    <div className="container py-10">
      <div className="flex items-center gap-4 mb-8">
        <Link href="/admin/dashboard">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <h1 className="text-3xl font-bold">Estatísticas do Evento</h1>
      </div>

      <div className="grid gap-6 md:grid-cols-4 mb-8">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Capacidade Total</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{estatisticas?.capacidadeTotal || 0}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Check-ins Realizados</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{estatisticas?.checkInsRealizados || 0}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Restantes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{estatisticas?.restantes || 0}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Ocupação</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{estatisticas?.percentualOcupado || 0}%</div>
            <div className="mt-2 h-2 w-full rounded-full bg-gray-200">
              <div
                className="h-full rounded-full bg-emerald-500"
                style={{ width: `${estatisticas?.percentualOcupado || 0}%` }}
              ></div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Check-ins Recentes</CardTitle>
          <CardDescription>Últimos convidados a chegarem</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {estatisticas?.checkInsRecentes && estatisticas.checkInsRecentes.length > 0 ? (
              estatisticas.checkInsRecentes.map((checkIn) => (
                <div key={checkIn.id} className="flex justify-between items-center border-b pb-2">
                  <div className="font-medium">{checkIn.email}</div>
                  <div className="text-sm text-muted-foreground">{formatarData(checkIn.horarioCheckIn)}</div>
                </div>
              ))
            ) : (
              <div className="text-center py-4 text-muted-foreground">Nenhum check-in recente</div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
