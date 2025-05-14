import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function HomePage() {
  return (
    <div className="container max-w-4xl mx-auto py-10 px-4">
      <div className="flex flex-col items-center text-center mb-10">
        <h1 className="text-4xl font-bold mb-4">Sistema de Check-in por Email</h1>
        <p className="text-xl text-muted-foreground max-w-2xl">
          Gerencie check-ins de convidados para eventos com capacidade de 50 a 140 pessoas
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Check-in de Convidados</CardTitle>
            <CardDescription>Faça check-in usando seu email e um código QR</CardDescription>
          </CardHeader>
          <CardContent className="flex justify-center">
            <Link href="/check-in">
              <Button size="lg">Fazer Check-in</Button>
            </Link>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Área do Administrador</CardTitle>
            <CardDescription>Gerencie check-ins e visualize estatísticas</CardDescription>
          </CardHeader>
          <CardContent className="flex justify-center">
            <Link href="/admin">
              <Button size="lg" variant="outline">
                Acessar Painel
              </Button>
            </Link>
          </CardContent>
        </Card>

        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Gerar Código QR</CardTitle>
            <CardDescription>Crie um código QR para o check-in dos convidados</CardDescription>
          </CardHeader>
          <CardContent className="flex justify-center">
            <Link href="/admin/codigo-qr">
              <Button>Gerar Código QR</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
