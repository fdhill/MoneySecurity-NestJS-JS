const base =
  process.env.SMOKE_URL || `http://localhost:${process.env.PORT || 3000}`;

async function main() {
  const res = await fetch(`${base}/api/health`);
  const body = await res.json();

  if (
    res.status !== 200 ||
    body.success !== true ||
    body.data?.database !== 'up'
  ) {
    throw new Error(`health gagal: HTTP ${res.status} ${JSON.stringify(body)}`);
  }

  console.log('OK /api/health', JSON.stringify(body));
}

main().catch((err) => {
  console.error(err.message);
  process.exit(1);
});
