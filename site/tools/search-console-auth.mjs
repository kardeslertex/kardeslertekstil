import crypto from "node:crypto";
import fs from "node:fs";
import http from "node:http";
import os from "node:os";
import path from "node:path";

const downloads = process.env.USERPROFILE ? path.join(process.env.USERPROFILE, "Downloads") : path.join(os.homedir(), "Downloads");
const localSecret = path.resolve(".search-console", "client-secret.json");
const explicitSecret = process.argv[2] || (fs.existsSync(localSecret) ? localSecret : "");
const secretFile = explicitSecret || fs.readdirSync(downloads)
  .filter((name) => name.startsWith("client_secret_") && name.endsWith(".json"))
  .map((name) => ({ name, time: fs.statSync(path.join(downloads, name)).mtimeMs }))
  .sort((a, b) => b.time - a.time)[0]?.name;

if (!secretFile) throw new Error("Downloads klasorunde client_secret JSON bulunamadi.");
const secretPath = explicitSecret ? explicitSecret : path.join(downloads, secretFile);
const config = JSON.parse(fs.readFileSync(secretPath, "utf8")).installed;
if (!config) throw new Error("OAuth istemcisi Desktop app turunde degil.");

const verifier = crypto.randomBytes(48).toString("base64url");
const challenge = crypto.createHash("sha256").update(verifier).digest("base64url");
const state = crypto.randomBytes(24).toString("hex");
const server = http.createServer();

server.listen(0, "127.0.0.1", () => {
  const port = server.address().port;
  const redirectUri = `http://127.0.0.1:${port}`;
  const params = new URLSearchParams({
    client_id: config.client_id,
    redirect_uri: redirectUri,
    response_type: "code",
    scope: "https://www.googleapis.com/auth/webmasters",
    access_type: "offline",
    prompt: "consent",
    code_challenge: challenge,
    code_challenge_method: "S256",
    state,
  });
  const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?${params}`;
  const targetDir = path.resolve(".search-console");
  fs.mkdirSync(targetDir, { recursive: true });
  fs.writeFileSync(path.join(targetDir, "auth-url.txt"), authUrl);
  console.log(`AUTH_URL=${authUrl}`);
});

server.on("request", async (req, res) => {
  const url = new URL(req.url, "http://127.0.0.1");
  if (url.searchParams.get("state") !== state) {
    res.writeHead(400).end("Gecersiz istek.");
    return;
  }
  const code = url.searchParams.get("code");
  if (!code) {
    res.writeHead(400).end("Google izni verilmedi.");
    server.close();
    return;
  }
  const redirectUri = `http://127.0.0.1:${server.address().port}`;
  const tokenResponse = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "content-type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      code,
      client_id: config.client_id,
      client_secret: config.client_secret,
      redirect_uri: redirectUri,
      grant_type: "authorization_code",
      code_verifier: verifier,
    }),
  });
  const token = await tokenResponse.json();
  if (!tokenResponse.ok) throw new Error(JSON.stringify(token));
  const targetDir = path.resolve(".search-console");
  fs.mkdirSync(targetDir, { recursive: true });
  fs.writeFileSync(path.join(targetDir, "token.json"), JSON.stringify(token, null, 2));
  res.writeHead(200, { "content-type": "text/html; charset=utf-8" });
  res.end("<h2>Baglanti tamamlandi.</h2><p>Bu sekmeyi kapatip Codex'e donebilirsiniz.</p>");
  console.log("AUTH_OK");
  server.close();
});
