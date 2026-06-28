import { type NextRequest } from "next/server";
import { updateSession } from "@/lib/supabase/middleware";

export async function middleware(request: NextRequest) {
  return updateSession(request);
}

export const config = {
  // Só roda nas rotas do admin (login + dashboard).
  matcher: ["/admin/:path*"],
};
