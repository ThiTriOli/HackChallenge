"use client"

import { useState } from "react"
import { QrReader } from "react-qr-reader"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { CheckCircle2, AlertCircle } from "lucide-react"

export default function CheckInPage() {
  const [email, setEmail] = useState("")
  const [escaneando, setEscaneando] = useState(false)
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle")
  const [mensagem, setMensagem] = useState("")
  const [carregando, setCarregando] = useState(false)

  // ID do evento padrão - em um aplicativo real, isso viria do contexto ou parâmetros de URL
  const eventoId = "evento-001"

  const handleScan = async (result: any) => {
    if (result && result.text && !carregando) {
      setEscaneando(false)

      // Validar que o usuário inseriu seu email
      if (!email.trim()) {
        setStatus("error")
        setMensagem("Por favor, digite seu email antes de escanear")
        return
      }

      // Validar formato de email
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!emailRegex.test(email)) {
        setStatus("error")
        setMensagem("Por favor, digite um email válido")
        return
      }

      try {
        setCarregando(true)

        // Processar os dados do código QR (neste caso, estamos apenas usando-o como um gatilho)
        // Em um aplicativo real, você pode validar o conteúdo do código QR
        const response = await fetch("/api/check-in", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            eventoId,
            email: email.trim(),
          }),
        })

        const data = await response.json()

        if (response.ok) {
          setStatus("success")
          setMensagem(`Check-in realizado com sucesso para ${email}!`)
          setEmail("")
        } else {
          setStatus("error")
          setMensagem(data.error || "Falha ao realizar check-in. Por favor, tente novamente.")
        }
      } catch (error) {
        setStatus("error")
        setMensagem("Ocorreu um erro. Por favor, tente novamente.")
        console.error("Erro de check-in:", error)
      } finally {
        setCarregando(false)
      }
    }
  }

  const handleError = (error: any) => {
    console.error("Erro do Scanner QR:", error)
    setStatus("error")
    setMensagem("Falha ao acessar a câmera. Por favor, verifique as permissões e tente novamente.")
    setEscaneando(false)
  }

  const resetStatus = () => {
    setStatus("idle")
    setMensagem("")
  }

  return (
    <div className="container max-w-md mx-auto py-10 px-4">
      <Card>
        <CardHeader>
          <CardTitle>Check-in do Evento</CardTitle>
          <CardDescription>Digite seu email e escaneie o código QR para fazer check-in</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {status === "idle" ? (
            <>
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium">
                  Email
                </label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Digite seu email"
                  disabled={escaneando || carregando}
                />
              </div>

              {escaneando ? (
                <div className="overflow-hidden rounded-lg">
                  <QrReader
                    onResult={handleScan}
                    constraints={{ facingMode: "environment" }}
                    onError={handleError}
                    className="w-full"
                  />
                  <p className="text-center text-sm mt-2">Posicione o código QR no quadro</p>
                </div>
              ) : (
                <Button onClick={() => setEscaneando(true)} className="w-full" disabled={carregando}>
                  Escanear Código QR
                </Button>
              )}
            </>
          ) : status === "success" ? (
            <Alert className="bg-green-50 border-green-200">
              <CheckCircle2 className="h-4 w-4 text-green-600" />
              <AlertTitle className="text-green-800">Sucesso!</AlertTitle>
              <AlertDescription className="text-green-700">{mensagem}</AlertDescription>
            </Alert>
          ) : (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Erro</AlertTitle>
              <AlertDescription>{mensagem}</AlertDescription>
            </Alert>
          )}
        </CardContent>
        {status !== "idle" && (
          <CardFooter>
            <Button onClick={resetStatus} className="w-full">
              Fazer Check-in de Outro Convidado
            </Button>
          </CardFooter>
        )}
      </Card>
    </div>
  )
}
