import type { Meta, StoryObj } from "@storybook/react";
import * as React from "react";
import { Button, IconButton, Tag, Toggle, Tabs, Tab } from "@ideeza/ui";
import { Plus } from "../../../packages/ui/src/lib/icons";

/**
 * Motion — the recipes the component stylesheets carry, side by side.
 *
 * Figma's prototype reactions specify one thing: a 120ms EASE_OUT cross-fade on
 * state change. `state` is exactly that. The other three are a deliberate
 * addition — a colour cross-fade alone never acknowledges the pointer, so
 * anything clickable also moves.
 *
 * These have to be felt, not read. Hover and hold each control below.
 */
const meta: Meta = {
  title: "Foundations/Motion",
  parameters: {
    layout: "padded",
    docs: { description: { component: "Hover and hold each control — the difference is in the release, not the press." } },
  },
};
export default meta;

const Row = ({ title, note, children }: { title: string; note: string; children: React.ReactNode }) => (
  <section className="flex flex-col gap-[8px] border-b border-border py-[24px] last:border-b-0">
    <h3 className="text-label-lg text-text-primary">{title}</h3>
    <p className="max-w-[62ch] text-body-sm text-text-secondary">{note}</p>
    <div className="flex flex-wrap items-center gap-[16px] pt-[8px]">{children}</div>
  </section>
);

export const Recipes: StoryObj = {
  render: () => {
    const [on, setOn] = React.useState(false);
    const [tab, setTab] = React.useState("one");
    return (
      <div className="flex flex-col">
        <Row
          title="state — 120ms, ease-out"
          note="Figma's spec, unchanged. Colour, border and shadow cross-fade; nothing moves. Correct for anything that only recolours, and the reason a static chip below feels different from a selectable one."
        >
          <Tag>static chip</Tag>
          <Tag selected>selected</Tag>
        </Row>

        <Row
          title="press — instant down, eased up"
          note="Scales to 0.97 while held. The press itself has no duration: any lag between finger and pixel reads as the control being slow. The release eases back over 120ms. That asymmetry is most of what 'responsive' means — press and hold to feel it."
        >
          <Button variant="secondary">Secondary</Button>
          <Button variant="ghost">Ghost</Button>
          <IconButton variant="secondary" aria-label="Add">
            <Plus />
          </IconButton>
          <Tag onSelect={() => {}}>selectable chip</Tag>
        </Row>

        <Row
          title="press + lift — hover raises, press releases"
          note="1px up and one shadow step on hover, dropped again on press. Only on hierarchies that already carry a shadow: Primary, Danger and AI. A flat control that lifts looks detached from the surface, which is why Secondary and Ghost above do not."
        >
          <Button>Primary</Button>
          <Button variant="danger">Danger</Button>
          <Button variant="ai">AI</Button>
          <Button variant="tonal">Tonal — no lift</Button>
        </Row>

        <Row
          title="spring — for a mark that travels"
          note="Overshoots slightly and settles, at the 200ms step so the overshoot is legible rather than a twitch. Reserved for something that actually moves across a distance: the toggle thumb, and the tab indicator, which is now one element that slides rather than each tab drawing its own underline. At rest both are pixel-identical to the Figma frames — the difference is only in transit. Wrong for colour, which cannot overshoot meaningfully."
        >
          <Toggle checked={on} onCheckedChange={setOn} aria-label="Toggle thumb" />
          <Tabs value={tab} onValueChange={setTab}>
            <Tab value="one">One</Tab>
            <Tab value="two">Two</Tab>
            <Tab value="three">Three</Tab>
          </Tabs>
        </Row>

        <Row
          title="reduced motion"
          note="Every recipe goes through the Motion tokens, so a `prefers-reduced-motion: reduce` request collapses all of it to near-zero in reset.css. Turn the OS setting on and this whole page goes still — the colours still change, they just stop animating."
        >
          <Button>Primary</Button>
          <Toggle checked={on} onCheckedChange={setOn} aria-label="Still switches" />
        </Row>
      </div>
    );
  },
};
