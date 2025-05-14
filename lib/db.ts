// Este arquivo simula um banco de dados para armazenar check-ins de convidados
// Em um ambiente de produção, você se conectaria a um banco de dados real

// Define os tipos para nossas estruturas de dados
export interface CheckInConvidado {
  id: string
  email: string
  horarioCheckIn: string
  eventoId: string
}

export interface Evento {
  id: string
  nome: string
  data: string
  capacidade: number
  contagemCheckIn: number
}

// Armazenamento em memória para nossos dados
let eventos: Evento[] = [
  {
    id: "evento-001",
    nome: "Gala Corporativa",
    data: "2025-06-15T18:00:00Z",
    capacidade: 140,
    contagemCheckIn: 0,
  },
]

let checkInsConvidados: CheckInConvidado[] = []

// Função para obter todos os eventos
export function getEventos(): Evento[] {
  return [...eventos]
}

// Função para obter um evento específico
export function getEvento(eventoId: string): Evento | undefined {
  return eventos.find((evento) => evento.id === eventoId)
}

// Função para obter todos os check-ins de um evento
export function getCheckInsEvento(eventoId: string): CheckInConvidado[] {
  return checkInsConvidados.filter((checkIn) => checkIn.eventoId === eventoId)
}

// Function alias to getCheckInsEvento
export function getEventCheckIns(eventoId: string): CheckInConvidado[] {
  return getCheckInsEvento(eventoId)
}

// Atualizar a função para verificar se um convidado já fez check-in usando email
export function convidadoJaFezCheckIn(eventoId: string, email: string): boolean {
  return checkInsConvidados.some(
    (checkIn) => checkIn.eventoId === eventoId && checkIn.email.toLowerCase() === email.toLowerCase(),
  )
}

// Atualizar a função para adicionar um novo check-in usando email
export function adicionarCheckIn(eventoId: string, email: string): CheckInConvidado | null {
  // Verificar se o evento existe
  const evento = getEvento(eventoId)
  if (!evento) {
    return null
  }

  // Verificar se o convidado já fez check-in
  if (convidadoJaFezCheckIn(eventoId, email)) {
    return null
  }

  // Verificar se o evento está na capacidade máxima
  if (evento.contagemCheckIn >= evento.capacidade) {
    return null
  }

  // Criar um novo registro de check-in
  const novoCheckIn: CheckInConvidado = {
    id: `checkin-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
    email,
    horarioCheckIn: new Date().toISOString(),
    eventoId,
  }

  // Adicionar o check-in ao nosso armazenamento de dados
  checkInsConvidados.push(novoCheckIn)

  // Atualizar a contagem de check-ins do evento
  eventos = eventos.map((e) => {
    if (e.id === eventoId) {
      return {
        ...e,
        contagemCheckIn: e.contagemCheckIn + 1,
      }
    }
    return e
  })

  return novoCheckIn
}

// Função para obter estatísticas de check-in para um evento
export function getEstatisticasEvento(eventoId: string) {
  const evento = getEvento(eventoId)
  if (!evento) {
    return null
  }

  const checkIns = getCheckInsEvento(eventoId)

  return {
    capacidadeTotal: evento.capacidade,
    checkInsRealizados: evento.contagemCheckIn,
    restantes: evento.capacidade - evento.contagemCheckIn,
    percentualOcupado: Math.round((evento.contagemCheckIn / evento.capacidade) * 100),
    checkInsRecentes: checkIns
      .sort((a, b) => new Date(b.horarioCheckIn).getTime() - new Date(a.horarioCheckIn).getTime())
      .slice(0, 5),
  }
}

// Function alias to getEstatisticasEvento
export function getEventStats(eventoId: string) {
  return getEstatisticasEvento(eventoId)
}

// Atualizar a função para pesquisar check-ins usando email
export function pesquisarCheckIns(eventoId: string, consulta: string): CheckInConvidado[] {
  if (!consulta) {
    return getCheckInsEvento(eventoId)
  }

  const consultaMinuscula = consulta.toLowerCase()
  return checkInsConvidados.filter(
    (checkIn) => checkIn.eventoId === eventoId && checkIn.email.toLowerCase().includes(consultaMinuscula),
  )
}

// Function alias to pesquisarCheckIns
export function searchCheckIns(eventoId: string, consulta: string): CheckInConvidado[] {
  return pesquisarCheckIns(eventoId, consulta)
}

// Função para limpar todos os check-ins para testes
export function limparCheckIns(eventoId: string): void {
  checkInsConvidados = checkInsConvidados.filter((checkIn) => checkIn.eventoId !== eventoId)

  eventos = eventos.map((e) => {
    if (e.id === eventoId) {
      return {
        ...e,
        contagemCheckIn: 0,
      }
    }
    return e
  })
}
