import * as React from "react";
import type { Decorator, Preview } from "@storybook/react";
import "@ideeza/tokens/css";
import "@ideeza/tokens/reset";
import "./preview.css";

const withTheme: Decorator = (Story, ctx) => {
  const theme = (ctx.globals.theme as string) ?? "light";
  document.documentElement.dataset.theme = theme;
  document.body.style.background = "var(--color-bg-page)";
  return (
    <div style={{ fontFamily: "var(--font-family-body)", color: "var(--color-text-primary)" }}>
      <Story />
    </div>
  );
};

export const decorators = [withTheme];

export const globalTypes = {
  theme: {
    description: "Color mode",
    defaultValue: "light",
    toolbar: { icon: "mirror", items: ["light", "dark"], dynamicTitle: true },
  },
};

const preview: Preview = {
  parameters: {
    controls: { expanded: true },
    layout: "centered",
  },
};
export default preview;
