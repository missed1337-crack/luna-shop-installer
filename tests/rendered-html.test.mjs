import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const installerUrl =
  "https://raw.githubusercontent.com/missed1337-crack/luna-shop-installer/main/install.ps1";

async function render() {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    new Request("http://localhost/", {
      headers: { accept: "text/html" },
    }),
    {
      ASSETS: {
        fetch: async () => new Response("Not found", { status: 404 }),
      },
    },
    {
      waitUntil() {},
      passThroughOnException() {},
    },
  );
}

test("server-renders the LUNA SHOP safe installer", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(html, /<title>LUNA\|SHOP — Safe Installer<\/title>/i);
  assert.match(html, new RegExp(`irm ${installerUrl.replaceAll(".", "\\.")} \\| iex`));
  assert.match(html, /It opens the local demo at http:\/\/localhost:1337/);
  assert.match(html, /DEMO ONLY — NO REAL STORE, PAYMENTS OR SHIPMENTS/);
  assert.match(html, /PAYMENT DISABLED/);
  assert.doesNotMatch(html, /<input|card number|bank account/i);
});

test("publishes identical, credential-free launcher scripts", async () => {
  const [rootInstaller, publicInstaller] = await Promise.all([
    readFile(new URL("../install.ps1", import.meta.url), "utf8"),
    readFile(new URL("../public/install.ps1", import.meta.url), "utf8"),
  ]);

  assert.equal(rootInstaller, publicInstaller);
  assert.match(rootInstaller, /\$env:LOCALAPPDATA/);
  assert.match(rootInstaller, /luna-shop\.cmd/);
  assert.match(rootInstaller, /LUNA\|SHOP DEMO ONLY/);
  assert.match(
    rootInstaller,
    /http:\/\/localhost:1337\//,
  );
  assert.doesNotMatch(
    rootInstaller,
    /gho_|ghp_|github_pat_|api[_-]?key|secret|password|private[_-]?key/i,
  );
});
