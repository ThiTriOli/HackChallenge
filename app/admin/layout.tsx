import type React from "react"
import type { ReactNode } from "react"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"

interface AdminLayoutProps {
  children: ReactNode
}

// Função para verificar autenticação (server-side only)
function getIsAuthenticated() {
  const cookieStore = cookies()
  const authCookie = cookieStore.get("admin_auth")
  return authCookie?.value === "nomeeail@gmail.com"
}

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // Verificar se estamos na página de login (server-side)
  const pathname = new URL(headers().get("x-url") || "http://localhost/").pathname
  const isLoginPage = pathname === "/admin/login"

  // Não proteger a página de login
  if (!isLoginPage) {
    // Verificar autenticação para todas as outras páginas admin
    const isAuthenticated = getIsAuthenticated()
    if (!isAuthenticated) {
      redirect("/admin/login")
    }
  }

  const isAuthenticated = getIsAuthenticated()

  return (
    <div className="min-h-screen">
      <main>{children}</main>
    </div>
  )
}

function headers() {
  return {
    get: (name: string) => {
      if (typeof window === "undefined") {
        // Server-side
        return undefined
      } else {
        // Client-side
        return window.location.href
      }
    },
  }
}
