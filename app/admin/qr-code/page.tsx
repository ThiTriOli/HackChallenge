import { GeradorCodigoQR } from "@/components/gerador-codigo-qr"

export default function QRCodePage() {
  return (
    <div className="container max-w-md mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold mb-8">Gerador de Código QR</h1>
      <GeradorCodigoQR />
    </div>
  )
}
