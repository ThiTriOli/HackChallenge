import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function HomePage() {
  return (
    <div className="container max-w-4xl mx-auto py-10 px-4">
      <div className="flex flex-col items-center text-center mb-10">
        <h1 className="text-4xl font-bold mb-4">Sistema de Check-in por Email</h1>
        <p className="text-xl text-muted-foreground max-w-2xl">
          Faça check-in para o evento usando seu email e o código QR
        </p>
      </div>

      <div className="grid gap-6">
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
      </div>

      <footer className="mt-20 text-center text-sm text-muted-foreground">
        <p>© {new Date().getFullYear()} Sistema de Check-in. Todos os direitos reservados.</p>
        {/* Link discreto para área administrativa */}
        <div className="mt-2">
          <Link href="/admin/login" className="text-xs text-muted-foreground hover:underline">
            Área Administrativa
          </Link>
        </div>
      </footer>
    </div>
  )
}
