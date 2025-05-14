"use client"

import type React from "react"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search, RefreshCw } from "lucide-react"
import type { CheckInConvidado } from "@/lib/db"

interface AdminClientProps {
  eventoId: string
  initialCheckIns: CheckInConvidado[]
}

export function AdminClient({ eventoId, initialCheckIns }: AdminClientProps) {
  const [checkIns, setCheckIns] = useState<CheckInConvidado[]>(initialCheckIns)
  const [consultaPesquisa, setConsultaPesquisa] = useState("")
  const [carregando, setCarregando] = useState(false)

  const buscarCheckIns = async () => {
    setCarregando(true)
    try {
      const url = `/api/eventos/${eventoId}/check-ins${
        consultaPesquisa ? `?consulta=${encodeURIComponent(consultaPesquisa)}` : ""
      }`
      const response = await fetch(url)
      if (response.ok) {
        const data = await response.json()
        setCheckIns(data.data)
      }
    } catch (error) {
      console.error("Erro ao buscar check-ins:", error)
    } finally {
      setCarregando(false)
    }
  }

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    buscarCheckIns()
  }

  const exportarCSV = () => {
    // Redirecionar para a API de exportação
    window.location.href = `/api/admin/exportar-csv?eventoId=${eventoId}`
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <form onSubmit={handleSearch} className="flex gap-2 flex-1">
          <Input
            placeholder="Pesquisar por email..."
            value={consultaPesquisa}
            onChange={(e) => setConsultaPesquisa(e.target.value)}
            className="flex-1"
          />
          <Button type="submit" variant="outline" disabled={carregando}>
            <Search className="h-4 w-4 mr-2" />
            Pesquisar
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={() => {
              setConsultaPesquisa("")
              buscarCheckIns()
            }}
            disabled={carregando}
          >
            <RefreshCw className="h-4 w-4" />
          </Button>
        </form>

        <Button variant="outline" onClick={exportarCSV} disabled={checkIns.length === 0} className="ml-2">
          Exportar CSV
        </Button>
      </div>

      {carregando && <div className="text-center py-4">Carregando...</div>}
    </div>
  )
}
