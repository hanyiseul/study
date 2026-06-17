export const dynamic = "force-dynamic";
export const revalidate = 0;

let localCount = 0;

type StateResponse = {
  dbCount: number;
  redisCount: number;
};

async function increaseState(): Promise<StateResponse> {
  const apiBaseUrl = process.env.API_BASE_URL ?? "http://127.0.0.1:3000";

  const response = await fetch(`${apiBaseUrl}/api/state/increase`, {
    method: "POST",
    cache: "no-store"
  });

  if (!response.ok) {
    throw new Error(`state api failed: ${response.status}`);
  }

  return (await response.json()) as StateResponse;
}

export default async function Home() {
  localCount++;

  const frontServer = process.env.FRONT_SERVER_NAME ?? "unknown";
  const state = await increaseState();

  return (
    <main>
      <h1>Distributed Redis State Demo</h1>
      <div id="front-server">Front Server: {frontServer}</div>
      <div id="local-count">Local Count: {localCount}</div>
      <div id="db-count">DB Count: {state.dbCount}</div>
      <div id="redis-count">Redis Count: {state.redisCount}</div>
    </main>
  );
}
