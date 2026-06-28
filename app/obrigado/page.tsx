import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function ObrigadoPage({
  searchParams,
}: {
  searchParams: Promise<{ status?: string }>;
}) {
  const { status } = await searchParams;
  const approved = status !== "failure" && status !== "rejected";

  return (
    <main className="grid min-h-screen place-items-center px-4">
      <div className="w-full max-w-md rounded-3xl bg-white p-8 text-center shadow-card">
        <div className="mx-auto grid h-20 w-20 place-items-center rounded-full bg-forest-50 text-5xl">
          {approved ? "💛" : "😢"}
        </div>

        {approved ? (
          <>
            <h1 className="mt-5 font-serif text-3xl text-ink">
              Muito obrigado!
            </h1>
            <p className="mt-3 text-muted">
              Seu presente foi confirmado e seu recadinho chegou direitinho.
              Você acabou de fazer parte de um capítulo lindo da nossa história.
              Te esperamos na festa! 🥂
            </p>
          </>
        ) : (
          <>
            <h1 className="mt-5 font-serif text-3xl text-ink">
              Ops, o pagamento não rolou
            </h1>
            <p className="mt-3 text-muted">
              Não se preocupe, nada foi cobrado. Você pode tentar de novo quando
              quiser — escolhe a cota e bora. 💛
            </p>
          </>
        )}

        <Link href="/" className="btn-primary mt-7 w-full">
          Voltar para a lista
        </Link>
      </div>
    </main>
  );
}
