"use client"

import { useState } from "react"
import QRCode from "react-qr-code"
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
    // Para react-qr-code, precisamos de uma abordagem diferente para download
    // já que ele renderiza um SVG, não um canvas
    const svg = document.getElementById("codigo-qr")
    if (svg) {
      // Converter SVG para uma string
      const svgData = new XMLSerializer().serializeToString(svg)

      // Criar um blob com os dados SVG
      const svgBlob = new Blob([svgData], { type: "image/svg+xml;charset=utf-8" })

      // Criar URL do blob
      const svgUrl = URL.createObjectURL(svgBlob)

      // Criar link de download
      const downloadLink = document.createElement("a")
      downloadLink.href = svgUrl
      downloadLink.download = `evento-${eventoId}-codigo-qr.svg`
      document.body.appendChild(downloadLink)
      downloadLink.click()
      document.body.removeChild(downloadLink)

      // Liberar a URL do objeto
      URL.revokeObjectURL(svgUrl)
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
          <QRCode
            id="codigo-qr"
            value={valorQR}
            size={tamanho}
            level="H"
            style={{ width: "100%", height: "auto", maxWidth: tamanho }}
          />
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
