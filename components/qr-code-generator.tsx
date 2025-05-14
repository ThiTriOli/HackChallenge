"use client"

import { useState } from "react"
import QRCode from "qrcode.react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Download } from "lucide-react"

interface QRCodeGeneratorProps {
  eventId?: string
  defaultValue?: string
}

export function QRCodeGenerator({ eventId = "event-001", defaultValue = "check-in" }: QRCodeGeneratorProps) {
  const [qrValue, setQrValue] = useState(defaultValue)
  const [size, setSize] = useState(256)

  const downloadQRCode = () => {
    const canvas = document.getElementById("qr-code") as HTMLCanvasElement
    if (canvas) {
      const pngUrl = canvas.toDataURL("image/png").replace("image/png", "image/octet-stream")

      const downloadLink = document.createElement("a")
      downloadLink.href = pngUrl
      downloadLink.download = `event-${eventId}-qrcode.png`
      document.body.appendChild(downloadLink)
      downloadLink.click()
      document.body.removeChild(downloadLink)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Event Check-In QR Code</CardTitle>
        <CardDescription>Generate a QR code for guests to scan when checking in</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col items-center space-y-4">
        <div className="bg-white p-4 rounded-lg">
          <QRCode id="qr-code" value={qrValue} size={size} level="H" includeMargin={true} />
        </div>

        <div className="w-full space-y-2">
          <label htmlFor="qr-value" className="text-sm font-medium">
            QR Code Value
          </label>
          <Input
            id="qr-value"
            value={qrValue}
            onChange={(e) => setQrValue(e.target.value)}
            placeholder="Enter QR code value"
          />
          <p className="text-xs text-muted-foreground">
            This value will be encoded in the QR code. For simple check-ins, any unique value works.
          </p>
        </div>

        <div className="w-full space-y-2">
          <label htmlFor="qr-size" className="text-sm font-medium">
            QR Code Size
          </label>
          <Input
            id="qr-size"
            type="number"
            min="128"
            max="512"
            step="32"
            value={size}
            onChange={(e) => setSize(Number(e.target.value))}
          />
        </div>
      </CardContent>
      <CardFooter>
        <Button onClick={downloadQRCode} className="w-full">
          <Download className="mr-2 h-4 w-4" />
          Download QR Code
        </Button>
      </CardFooter>
    </Card>
  )
}
