import type { Config } from "tailwindcss";
import { ideezaPreset } from "@ideeza/tokens/tailwind-preset";

export default {
  presets: [ideezaPreset],
  content: [
    "./stories/**/*.{ts,tsx}",
    "../../packages/ui/src/**/*.{ts,tsx}",
  ],
} satisfies Config;
