"use server"

import { cookies } from "next/headers"

// Email autorizado para acessar o painel administrativo
// Em um sistema real, isso estaria em variáveis de ambiente
const ADMIN_EMAIL = "adiministrador@gmail.com"

// Chave do cookie de autenticação
const AUTH_COOKIE = "admin_auth"

// Função para definir o cookie de autenticação (server action)
export async function loginAdmin(formData: FormData): Promise<{ success: boolean; message: string }> {
  const email = formData.get("email") as string

  if (!email || email.toLowerCase() !== ADMIN_EMAIL.toLowerCase()) {
    return {
      success: false,
      message: "Email não autorizado para acesso administrativo.",
    }
  }

  // Definir cookie de autenticação (expira em 24 horas)
  cookies().set({
    name: AUTH_COOKIE,
    value: email,
    httpOnly: true,
    path: "/",
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 24, // 24 horas
  })

  return {
    success: true,
    message: "Login realizado com sucesso!",
  }
}

// Função para fazer logout (server action)
export async function logoutAdmin(): Promise<void> {
  cookies().delete(AUTH_COOKIE)
}
