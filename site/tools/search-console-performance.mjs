import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const authDir = path.join(root, ".search-console");
const secret = JSON.parse(fs.readFileSync(path.join(authDir, "client-secret.json"), "utf8")).installed;
const tokenPath = path.join(authDir, "token.json");
const outputPath = path.join(authDir, "search-performance.json");
let token = JSON.parse(fs.readFileSync(tokenPath, "utf8"));

async function refreshAccessToken() {
  if (!token.refresh_token) return;
  const response = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "content-type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      client_id: secret.client_id,
      client_secret: secret.client_secret,
      refresh_token: token.refresh_token,
      grant_type: "refresh_token",
    }),
  });
  const update = await response.json();
  if (!response.ok) throw new Error(`Token yenilenemedi: ${JSON.stringify(update)}`);
  token = { ...token, ...update };
  fs.writeFileSync(tokenPath, JSON.stringify(token, null, 2));
}

async function requestPerformance(refreshed = false) {
  const end = new Date();
  end.setUTCDate(end.getUTCDate() - 2);
  const start = new Date(end);
  start.setUTCDate(start.getUTCDate() - 89);
  const response = await fetch(
    "https://searchconsole.googleapis.com/webmasters/v3/sites/sc-domain%3Akardeslertekstil.com.tr/searchAnalytics/query",
    {
      method: "POST",
      headers: {
        authorization: `Bearer ${token.access_token}`,
        "content-type": "application/json",
      },
      body: JSON.stringify({
        startDate: start.toISOString().slice(0, 10),
        endDate: end.toISOString().slice(0, 10),
        dimensions: ["query", "page"],
        rowLimit: 25000,
        dataState: "final",
      }),
    },
  );
  if (response.status === 401 && !refreshed) {
    await refreshAccessToken();
    return requestPerformance(true);
  }
  const body = await response.json();
  if (!response.ok) throw new Error(`${response.status}: ${JSON.stringify(body)}`);
  return {
    startDate: start.toISOString().slice(0, 10),
    endDate: end.toISOString().slice(0, 10),
    fetchedAt: new Date().toISOString(),
    rows: body.rows || [],
  };
}

const result = await requestPerformance();
fs.writeFileSync(outputPath, JSON.stringify(result, null, 2));
console.log(JSON.stringify({ rows: result.rows.length, startDate: result.startDate, endDate: result.endDate }, null, 2));
