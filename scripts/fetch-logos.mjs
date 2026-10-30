// Downloads the SaaS logos listed in src/brand.ts into public/logos/ and
// writes the slugs that arrived to src/logos-available.json.
// Usage: npm run fetch-logos
import { mkdir, readFile, writeFile } from "node:fs/promises";

const brand = await readFile(new URL("../src/brand.ts", import.meta.url), "utf8");
const base = brand.match(/logoBaseUrl =\s*"([^"]+)"/)[1];
const list = brand.match(/export const saas = \[([\s\S]*?)\];/)[1];
const names = [...list.matchAll(/"([^"]+)"/g)].map((m) => m[1]);
const slug = (n) => n.toLowerCase().replace(/[\s.]+/g, "-");

await mkdir(new URL("../public/logos/", import.meta.url), { recursive: true });
const ok = [];
for (const name of names) {
  const s = slug(name);
  try {
    const res = await fetch(`${base}/${s}.png`);
    const type = res.headers.get("content-type") ?? "";
    if (!res.ok || !type.startsWith("image/")) throw new Error(`${res.status} ${type}`);
    await writeFile(new URL(`../public/logos/${s}.png`, import.meta.url), Buffer.from(await res.arrayBuffer()));
    ok.push(s);
    console.log(`ok   ${name}`);
  } catch (e) {
    console.log(`skip ${name} (${e.message})`);
  }
}
await writeFile(new URL("../src/logos-available.json", import.meta.url), JSON.stringify(ok, null, 2) + "\n");
console.log(`\n${ok.length}/${names.length} logos saved to public/logos/`);
