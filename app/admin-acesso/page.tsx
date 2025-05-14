import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { LockKeyhole } from "lucide-react"

export default function AdminAcessoPage() {
  return (
    <div className="container max-w-md mx-auto py-10 px-4">
      <div className="flex flex-col items-center text-center mb-10">
        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
          <LockKeyhole className="h-8 w-8 text-gray-600" />
        </div>
        <h1 className="text-3xl font-bold mb-2">Área Restrita</h1>
        <p className="text-muted-foreground">Acesso exclusivo para administradores do sistema</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Acesso Administrativo</CardTitle>
          <CardDescription>Entre com suas credenciais para acessar o painel administrativo</CardDescription>
        </CardHeader>
        <CardContent className="flex justify-center">
          <Link href="/admin/login">
            <Button size="lg">Entrar no Sistema</Button>
          </Link>
        </CardContent>
      </Card>

      <div className="mt-8 text-center">
        <Link href="/" className="text-sm text-muted-foreground hover:underline">
          Voltar para a página inicial
        </Link>
      </div>
    </div>
  )
}
