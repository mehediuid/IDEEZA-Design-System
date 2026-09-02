import { defineConfig } from "tsup";

export default defineConfig({
  entry: { index: "src/index.ts", "tailwind-preset": "src/tailwind-preset.ts" },
  format: ["esm", "cjs"],
  // `dts: true` alone leaves `export * from "@ideeza/ui"` in the .d.ts even
  // though the JS is bundled — types and runtime disagree, and TypeScript
  // consumers get "Cannot find module". `resolve` inlines them too.
  // Whatever is bundled must also be inlined into the declarations, or the
  // .d.ts points at packages the consumer was never given. The runtime looks
  // fine and TypeScript fails, which is the worst of both.
  dts: { resolve: [/^@ideeza\//, /^@radix-ui\//, /^class-variance-authority/, /^clsx/] },
  // tailwind-merge is deliberately absent: nothing in the public API exposes
  // its types, and inlining them crashes rollup-dts on its conditional types.
  sourcemap: true,
  clean: true,
  // React stays external — two copies of React in one app is a broken app.
  external: ["react", "react-dom"],
  // Everything except React is bundled in, so the published package has no
  // runtime dependencies at all.
  //
  // The workspace packages have to be: they are workspace-only, and npm has
  // no @ideeza/ui to resolve for an installed copy.
  //
  // The rest is a choice. clsx, tailwind-merge and cva are pure functions —
  // a second copy of a pure function costs bytes and nothing else. The three
  // Radix packages hold React context, so a bundled copy cannot see a
  // consumer's own Radix providers; that is acceptable here because this
  // package exports its own TooltipProvider, which is the one its Tooltip
  // reads. A consumer who wires our Tooltip to their Radix provider instead
  // is the one case this breaks, and the README says to use ours.
  noExternal: [/^@ideeza\//, /^@radix-ui\//, 'clsx', 'tailwind-merge',
               'class-variance-authority'],
  banner: { js: '"use client";' },
});
