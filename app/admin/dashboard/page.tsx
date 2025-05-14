import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { BarChart2, QrCode, Users, LogOut } from "lucide-react"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"

// Função para verificar autenticação (server-side only)
function getIsAuthenticated() {
  const cookieStore = cookies()
  const authCookie = cookieStore.get("admin_auth")
  return authCookie?.value === "adiministrador@gmail.com"
}

export default function DashboardPage() {
  // Verificar autenticação
  const isAuthenticated = getIsAuthenticated()
  if (!isAuthenticated) {
    redirect("/admin/login")
  }

  return (
    <div className="container py-10">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Painel Administrativo</h1>
        <form
          action={async () => {
            "use server"
            cookies().delete("admin_auth")
            redirect("/")
          }}
        >
          <Button variant="outline" type="submit" className="flex items-center gap-2">
            <LogOut className="h-4 w-4" />
            Sair
          </Button>
        </form>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total de Check-ins</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">0</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Capacidade</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">140</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Ocupação</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">0%</div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Visualizar Check-ins</CardTitle>
            <CardDescription>Ver todos os convidados que fizeram check-in</CardDescription>
          </CardHeader>
          <CardContent>
            <Link href="/admin/check-ins">
              <Button className="w-full flex items-center gap-2">
                <Users className="h-4 w-4" />
                Ver Check-ins
              </Button>
            </Link>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Estatísticas</CardTitle>
            <CardDescription>Visualizar estatísticas do evento</CardDescription>
          </CardHeader>
          <CardContent>
            <Link href="/admin/estatisticas">
              <Button className="w-full flex items-center gap-2">
                <BarChart2 className="h-4 w-4" />
                Ver Estatísticas
              </Button>
            </Link>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Gerar QR Code</CardTitle>
            <CardDescription>Criar QR code para check-in</CardDescription>
          </CardHeader>
          <CardContent>
            <Link href="/admin/codigo-qr">
              <Button className="w-full flex items-center gap-2">
                <QrCode className="h-4 w-4" />
                Gerar QR Code
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
