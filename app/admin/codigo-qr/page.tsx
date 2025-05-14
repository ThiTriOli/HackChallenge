import { GeradorCodigoQR } from "@/components/gerador-codigo-qr"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"

// Função para verificar autenticação (server-side only)
function getIsAuthenticated() {
  const cookieStore = cookies()
  const authCookie = cookieStore.get("admin_auth")
  return authCookie?.value === "adiministrador@gmail.com"
}

export default function PaginaCodigoQR() {
  // Verificar autenticação
  const isAuthenticated = getIsAuthenticated()
  if (!isAuthenticated) {
    redirect("/admin/login")
  }

  return (
    <div className="container max-w-md mx-auto py-10 px-4">
      <div className="flex items-center gap-4 mb-8">
        <Link href="/admin/dashboard">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <h1 className="text-3xl font-bold">Gerador de Código QR</h1>
      </div>

      <GeradorCodigoQR />
    </div>
  )
}
