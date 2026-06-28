"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2, Lock } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { isSupabaseConfigured } from "@/lib/supabase/config";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const supabase = createClient();
      const { error } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password,
      });
      if (error) {
        setError("E-mail ou senha incorretos.");
        setLoading(false);
        return;
      }
      router.push("/admin");
      router.refresh();
    } catch {
      setError("Não foi possível entrar. Tente novamente.");
      setLoading(false);
    }
  }

  return (
    <main className="grid min-h-screen place-items-center px-4">
      <div className="w-full max-w-sm rounded-3xl bg-white p-8 shadow-card">
        <div className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-forest-50 text-forest-500">
          <Lock size={24} />
        </div>
        <h1 className="mt-4 text-center font-serif text-2xl text-ink">
          Painel dos noivos
        </h1>
        <p className="mt-1 text-center text-sm text-muted">
          Entre para gerenciar a lista de presentes.
        </p>

        {!isSupabaseConfigured ? (
          <p className="mt-6 rounded-xl2 bg-mocha-100 px-4 py-3 text-center text-sm text-mocha-500">
            🛠️ Modo demonstração: conecte o Supabase para ativar o login do
            admin.
          </p>
        ) : (
          <form onSubmit={handleSubmit} className="mt-6 space-y-3">
            <input
              type="email"
              placeholder="E-mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full rounded-xl2 border border-cream-200 bg-cream-50 px-4 py-3 text-sm outline-none transition focus:border-forest-400"
            />
            <input
              type="password"
              placeholder="Senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full rounded-xl2 border border-cream-200 bg-cream-50 px-4 py-3 text-sm outline-none transition focus:border-forest-400"
            />
            {error && (
              <p className="rounded-lg bg-forest-50 px-3 py-2 text-sm text-forest-700">
                {error}
              </p>
            )}
            <button type="submit" disabled={loading} className="btn-primary w-full">
              {loading ? (
                <>
                  <Loader2 size={18} className="animate-spin" /> Entrando...
                </>
              ) : (
                "Entrar"
              )}
            </button>
          </form>
        )}
      </div>
    </main>
  );
}
