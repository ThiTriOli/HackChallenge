"use client"

import { useState } from "react"
import QRCode from "qrcode.react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Download } from "lucide-react"

interface GeradorCodigoQRProps {
  eventoId?: string
  valorPadrao?: string
}

export function GeradorCodigoQR({ eventoId = "evento-001", valorPadrao = "check-in" }: GeradorCodigoQRProps) {
  const [valorQR, setValorQR] = useState(valorPadrao)
  const [tamanho, setTamanho] = useState(256)

  const baixarCodigoQR = () => {
    const canvas = document.getElementById("codigo-qr") as HTMLCanvasElement
    if (canvas) {
      const pngUrl = canvas.toDataURL("image/png").replace("image/png", "image/octet-stream")

      const linkDownload = document.createElement("a")
      linkDownload.href = pngUrl
      linkDownload.download = `evento-${eventoId}-codigo-qr.png`
      document.body.appendChild(linkDownload)
      linkDownload.click()
      document.body.removeChild(linkDownload)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Código QR para Check-in no Evento</CardTitle>
        <CardDescription>Gere um código QR para os convidados escanearem ao fazer check-in</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col items-center space-y-4">
        <div className="bg-white p-4 rounded-lg">
          <QRCode id="codigo-qr" value={valorQR} size={tamanho} level="H" includeMargin={true} />
        </div>

        <div className="w-full space-y-2">
          <label htmlFor="valor-qr" className="text-sm font-medium">
            Valor do Código QR
          </label>
          <Input
            id="valor-qr"
            value={valorQR}
            onChange={(e) => setValorQR(e.target.value)}
            placeholder="Digite o valor do código QR"
          />
          <p className="text-xs text-muted-foreground">
            Este valor será codificado no código QR. Para check-ins simples, qualquer valor único funciona.
          </p>
        </div>

        <div className="w-full space-y-2">
          <label htmlFor="tamanho-qr" className="text-sm font-medium">
            Tamanho do Código QR
          </label>
          <Input
            id="tamanho-qr"
            type="number"
            min="128"
            max="512"
            step="32"
            value={tamanho}
            onChange={(e) => setTamanho(Number(e.target.value))}
          />
        </div>
      </CardContent>
      <CardFooter>
        <Button onClick={baixarCodigoQR} className="w-full">
          <Download className="mr-2 h-4 w-4" />
          Baixar Código QR
        </Button>
      </CardFooter>
    </Card>
  )
}
