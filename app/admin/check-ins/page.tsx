import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { ArrowLeft, Download } from "lucide-react"
import { getCheckInsEvento } from "@/lib/db"
import Link from "next/link"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"

// Função para verificar autenticação (server-side only)
function getIsAuthenticated() {
  const cookieStore = cookies()
  const authCookie = cookieStore.get("admin_auth")
  return authCookie?.value === "adiministrador@gmail.com"
}

export default function CheckInsPage() {
  // Verificar autenticação
  const isAuthenticated = getIsAuthenticated()
  if (!isAuthenticated) {
    redirect("/admin/login")
  }

  // Obter dados do servidor
  const eventoId = "evento-001"
  const checkIns = getCheckInsEvento(eventoId)

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
        <h1 className="text-3xl font-bold">Check-ins de Convidados</h1>
      </div>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Lista de Check-ins</CardTitle>
            <CardDescription>Todos os convidados que fizeram check-in no evento</CardDescription>
          </div>
          <Link href="/api/admin/exportar-csv">
            <Button variant="outline" disabled={checkIns.length === 0}>
              <Download className="h-4 w-4 mr-2" />
              Exportar CSV
            </Button>
          </Link>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Email</TableHead>
                  <TableHead>Horário de Check-in</TableHead>
                  <TableHead>QR Code</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {checkIns.length > 0 ? (
                  checkIns.map((checkIn) => (
                    <TableRow key={checkIn.id}>
                      <TableCell className="font-medium">{checkIn.email}</TableCell>
                      <TableCell>{formatarData(checkIn.horarioCheckIn)}</TableCell>
                      <TableCell>{checkIn.qrCodeData ? "✓" : "—"}</TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={3} className="text-center py-4">
                      Nenhum check-in encontrado
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
