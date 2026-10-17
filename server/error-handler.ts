export default function errorHandler(error: unknown) {
  const err = error as { message?: string; stack?: string; status?: number };
  const message = err?.message || String(error);
  const stack = err?.stack || "";
  console.error("[atelier-hs4]", message, stack);
  return new Response(
    JSON.stringify({ error: true, message, stack }, null, 2),
    {
      status: typeof err?.status === "number" ? err.status : 500,
      headers: { "content-type": "application/json; charset=utf-8" },
    },
  );
}
