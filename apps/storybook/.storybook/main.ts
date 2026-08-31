import type { StorybookConfig } from "@storybook/react-vite";
import { fileURLToPath } from "node:url";

/**
 * Storybook resolves @ideeza/ui and @ideeza/tokens to their source, not to
 * dist.
 *
 * The package entry points at dist, so before this alias Storybook rendered
 * the last build while tokens.css was read straight from source. A change to
 * a component — cn.ts, most painfully — appeared to have no effect until
 * someone remembered to run `pnpm build`, which made a fixed bug look like a
 * live one. Reading source keeps what is on screen and what is in the editor
 * the same thing, and Vite hot-reloads it.
 *
 * Consumers still get dist; this only affects the local playground.
 */
const src = (p: string) => fileURLToPath(new URL(p, import.meta.url));

const config: StorybookConfig = {
  framework: { name: "@storybook/react-vite", options: {} },
  stories: ["../stories/**/*.stories.@(ts|tsx)"],
  addons: ["@storybook/addon-essentials"],
  core: { disableTelemetry: true },
  viteFinal: async (cfg) => {
    cfg.resolve = cfg.resolve ?? {};
    cfg.resolve.alias = {
      ...(cfg.resolve.alias as Record<string, string>),
      "@ideeza/ui": src("../../../packages/ui/src/index.ts"),
      "@ideeza/tokens/tailwind-preset": src("../../../packages/tokens/src/tailwind-preset.ts"),
    };
    return cfg;
  },
};
export default config;
