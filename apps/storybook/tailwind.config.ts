import { ideezaPreset } from "@ideeza/tokens/tailwind-preset";

export default {
  presets: [ideezaPreset],
  content: [
    "./stories/**/*.{ts,tsx}",
    "./.storybook/**/*.{ts,tsx}",
    // motion.ts holo .ts — .tsx noy. Ei glob age sudhu .tsx dekhto, tai
    // lib/motion.ts-er class string gulo Tailwind kokhono dekhei ni ar
    // CSS-e generate-o koreni. Component thik chilo, CSS-e class-i chilo na.
    "../../packages/ui/src/**/*.{ts,tsx}",
  ],
};
