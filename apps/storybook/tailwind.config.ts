import { ideezaPreset } from "@ideeza/tokens/tailwind-preset";

export default {
  presets: [ideezaPreset],
  content: [
    "./stories/**/*.{ts,tsx}",
    "./.storybook/**/*.{ts,tsx}",
    "../../packages/ui/src/**/*.tsx",
  ],
};
