import "server-only";
import type { Message } from "@/lib/types";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import { createAdminClient } from "@/lib/supabase/admin";

type MessageRow = {
  id: string;
  name: string;
  message: string;
  created_at: string;
};

function mapMessage(row: MessageRow): Message {
  return {
    id: row.id,
    name: row.name,
    message: row.message,
    createdAt: row.created_at,
  };
}

/** Recados do mural, mais recentes primeiro. */
export async function getMessages(limit = 200): Promise<Message[]> {
  if (!isSupabaseConfigured) return [];
  const supabase = createAdminClient();
  const { data, error } = await supabase
    .from("messages")
    .select("id, name, message, created_at")
    .order("created_at", { ascending: false })
    .limit(limit);

  if (error || !data) return [];
  return (data as MessageRow[]).map(mapMessage);
}
