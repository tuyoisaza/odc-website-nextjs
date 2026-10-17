const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const vm = require("node:vm");
const ts = require("typescript");
const brands = require("../lib/client-brands.json");

// Exercise the real TypeScript resolver without adding another runtime loader.
const compiled = ts.transpileModule(fs.readFileSync(path.join(__dirname, "../lib/client-branding.ts"), "utf8"), {
  compilerOptions: { module: ts.ModuleKind.CommonJS, esModuleInterop: true },
}).outputText;
const exported = {};
vm.runInNewContext(compiled, { exports: exported, URL, require: () => brands });
const { getClientLogos, getClientUrl } = exported;

test("all 26 existing placeholder records resolve to the 27 real local files", () => {
  assert.equal(brands.length, 26);
  const assets = brands.flatMap((brand) => {
    const logos = getClientLogos(brand.name, "placeholder");
    assert.ok(logos.length);
    for (const logo of logos) {
      assert.ok(logo.src.startsWith("/clients/"));
      assert.ok(fs.statSync(path.join(__dirname, "../public", logo.src)).size > 0);
    }
    return logos;
  });
  assert.equal(assets.length, 27);
});

test("blank and legacy domain logos resolve despite accents and punctuation", () => {
  assert.equal(getClientLogos("  CERAMICA ITALIA ", null)[0].src, "/clients/ceramica-italia.png");
  assert.equal(getClientLogos("AB InBev", "ab-inbev.com")[0].src, "/clients/ab-inbev.svg");
  assert.equal(getClientLogos("Petalli / Blumelii", "").length, 2);
});

test("CMS image overrides work and missing brands stay empty for the labeled fallback", () => {
  assert.equal(getClientLogos("Hyland", "/uploads/custom.svg")[0].src, "/uploads/custom.svg");
  assert.equal(getClientLogos("Hyland", "https://example.com/logo.png")[0].src, "https://example.com/logo.png");
  assert.equal(getClientLogos("Unknown", null).length, 0);
  assert.equal(getClientLogos("Unknown", "javascript:alert(1)").length, 0);
});

test("verified destinations replace missing/hash links while retaining CMS overrides", () => {
  assert.equal(getClientUrl("WOPP", "#"), "https://linktr.ee/wopp.co");
  assert.equal(getClientUrl("Distribuciones La Integridad", null), "https://laintegridad.com/");
  assert.equal(getClientUrl("WOPP", "https://example.com/custom"), "https://example.com/custom");
  assert.equal(getClientUrl("Unknown", "#"), undefined);
  assert.equal(getClientUrl("Unknown", "javascript:alert(1)"), undefined);
});
