export const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
export const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "";
export const SUPABASE_SERVICE_ROLE_KEY =
  process.env.SUPABASE_SERVICE_ROLE_KEY ?? "";

/**
 * Verdadeiro quando as credenciais públicas do Supabase estão presentes.
 * Quando falso, a aplicação roda em "modo demonstração" lendo do seed estático.
 */
export const isSupabaseConfigured = Boolean(SUPABASE_URL && SUPABASE_ANON_KEY);

/** Verdadeiro quando há service role key (operações privilegiadas no servidor). */
export const hasServiceRole = Boolean(SUPABASE_URL && SUPABASE_SERVICE_ROLE_KEY);

/**
 * E-mails autorizados a acessar o painel admin (separados por vírgula em ADMIN_EMAILS).
 * Importante quando o projeto Supabase é compartilhado com outros sistemas.
 */
export const ADMIN_EMAILS = (process.env.ADMIN_EMAILS ?? "")
  .split(",")
  .map((e) => e.trim().toLowerCase())
  .filter(Boolean);

/** Se não houver allowlist, qualquer usuário autenticado é admin; senão, só os da lista. */
export function isAdminEmail(email?: string | null): boolean {
  if (ADMIN_EMAILS.length === 0) return true;
  return !!email && ADMIN_EMAILS.includes(email.toLowerCase());
}
