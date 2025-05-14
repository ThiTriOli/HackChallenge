"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Search, RefreshCw } from "lucide-react"
import type { CheckInConvidado } from "@/lib/db"

interface EstatisticasEvento {
  capacidadeTotal: number
  checkInsRealizados: number
  restantes: number
  percentualOcupado: number
  checkInsRecentes: CheckInConvidado[]
}

export default function AdminPage() {
  const [estatisticas, setEstatisticas] = useState<EstatisticasEvento | null>(null)
  const [checkIns, setCheckIns] = useState<CheckInConvidado[]>([])
  const [consultaPesquisa, setConsultaPesquisa] = useState("")
  const [carregando, setCarregando] = useState(false)

  // ID do evento padrão - em um aplicativo real, isso viria do contexto ou parâmetros de URL
  const eventoId = "evento-001"

  const buscarEstatisticas = async () => {
    try {
      const response = await fetch(`/api/eventos/${eventoId}/estatisticas`)
      if (response.ok) {
        const data = await response.json()
        setEstatisticas(data.data)
      }
    } catch (error) {
      console.error("Erro ao buscar estatísticas:", error)
    }
  }

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

  useEffect(() => {
    buscarEstatisticas()
    buscarCheckIns()

    // Configurar polling para atualizações em tempo real
    const interval = setInterval(() => {
      buscarEstatisticas()
      if (!consultaPesquisa) {
        buscarCheckIns()
      }
    }, 30000) // Polling a cada 30 segundos

    return () => clearInterval(interval)
  }, [])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    buscarCheckIns()
  }

  const formatarData = (dataString: string) => {
    const data = new Date(dataString)
    return new Intl.DateTimeFormat("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    }).format(data)
  }

  return (
    <div className="container py-10">
      <h1 className="text-3xl font-bold mb-8">Painel de Check-in do Evento</h1>

      <div className="grid gap-6 md:grid-cols-4 mb-8">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Capacidade Total</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{estatisticas?.capacidadeTotal || 0}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Check-ins Realizados</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{estatisticas?.checkInsRealizados || 0}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Restantes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{estatisticas?.restantes || 0}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Ocupação</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{estatisticas?.percentualOcupado || 0}%</div>
            <div className="mt-2 h-2 w-full rounded-full bg-gray-200">
              <div
                className="h-full rounded-full bg-emerald-500"
                style={{ width: `${estatisticas?.percentualOcupado || 0}%` }}
              ></div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-3 mb-8">
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Check-ins de Convidados</CardTitle>
            <CardDescription>Pesquise e visualize todos os convidados que fizeram check-in</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSearch} className="flex gap-2 mb-4">
              <Input
                placeholder="Pesquisar por email..."
                value={consultaPesquisa}
                onChange={(e) => setConsultaPesquisa(e.target.value)}
                className="flex-1"
              />
              <Button type="submit" variant="outline">
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
              >
                <RefreshCw className="h-4 w-4" />
              </Button>
            </form>

            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Email</TableHead>
                    <TableHead>Horário de Check-in</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {carregando ? (
                    <TableRow>
                      <TableCell colSpan={2} className="text-center py-4">
                        Carregando...
                      </TableCell>
                    </TableRow>
                  ) : checkIns.length > 0 ? (
                    checkIns.map((checkIn) => (
                      <TableRow key={checkIn.id}>
                        <TableCell className="font-medium">{checkIn.email}</TableCell>
                        <TableCell>{formatarData(checkIn.horarioCheckIn)}</TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={2} className="text-center py-4">
                        Nenhum check-in encontrado
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Check-ins Recentes</CardTitle>
            <CardDescription>Últimos convidados a chegarem</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {estatisticas?.checkInsRecentes && estatisticas.checkInsRecentes.length > 0 ? (
                estatisticas.checkInsRecentes.map((checkIn) => (
                  <div key={checkIn.id} className="flex justify-between items-center border-b pb-2">
                    <div className="font-medium">{checkIn.email}</div>
                    <div className="text-sm text-muted-foreground">{formatarData(checkIn.horarioCheckIn)}</div>
                  </div>
                ))
              ) : (
                <div className="text-center py-4 text-muted-foreground">Nenhum check-in recente</div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
