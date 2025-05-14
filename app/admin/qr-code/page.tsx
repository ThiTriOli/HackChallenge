import { QRCodeGenerator } from "@/components/qr-code-generator"

export default function QRCodePage() {
  return (
    <div className="container max-w-md mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold mb-8">QR Code Generator</h1>
      <QRCodeGenerator />
    </div>
  )
}
