import Link from "next/link";

export default function NotFound() {
  return (
    <main className="grid min-h-screen place-items-center px-4 text-center">
      <div>
        <p className="text-6xl">🎁</p>
        <h1 className="mt-4 font-serif text-3xl text-ink">
          Não encontramos essa página
        </h1>
        <p className="mt-2 text-muted">
          Mas a nossa lista de presentes está te esperando!
        </p>
        <Link href="/" className="btn-primary mt-6">
          Voltar para a lista
        </Link>
      </div>
    </main>
  );
}
