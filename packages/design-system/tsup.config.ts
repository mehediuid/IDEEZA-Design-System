import { defineConfig } from "tsup";

export default defineConfig({
  entry: { index: "src/index.ts", "tailwind-preset": "src/tailwind-preset.ts" },
  format: ["esm", "cjs"],
  // `dts: true` alone leaves `export * from "@ideeza/ui"` in the .d.ts even
  // though the JS is bundled — types and runtime disagree, and TypeScript
  // consumers get "Cannot find module". `resolve` inlines them too.
  dts: { resolve: [/^@ideeza\//] },
  sourcemap: true,
  clean: true,
  // React stays external — two copies of React in one app is a broken app.
  external: ["react", "react-dom"],
  // The workspace packages are bundled IN. They are a build-time split, and
  // they are workspace-only: an installed copy of this package must not
  // resolve @ideeza/ui, because npm has no such package to resolve it to.
  noExternal: [/^@ideeza\//],
  banner: { js: '"use client";' },
});
