import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Link, ButtonGroup, ButtonGroupSegment, InlineCta, Avatar, AvatarGroup, AvatarLabelGroup } from "@ideeza/ui";

/** A03, A15, A28 and the A16b / A16c avatar compositions. */
const meta = { title: "Atoms/Action & people" } satisfies Meta;
export default meta;
type Story = StoryObj<typeof meta>;

const Row = ({ label, children }: { label: string; children: React.ReactNode }) => (
  <div className="flex flex-col gap-[8px]">
    <span className="text-caption-sm text-text-tertiary">{label}</span>
    <div className="flex flex-wrap items-center gap-[20px]">{children}</div>
  </div>
);

export const Links: Story = {
  name: "A03 Link",
  render: () => (
    <div className="flex flex-col gap-[24px]">
      <Row label="Sizes — SM · MD · LG">
        {(["sm", "md", "lg"] as const).map((s) => (
          <Link key={s} size={s} href="#">Read the docs</Link>
        ))}
      </Row>
      <Row label="Colours">
        <Link href="#">Brand</Link>
        <Link color="neutral" href="#">Neutral</Link>
        <Link color="error" href="#">Error</Link>
        <Link href="#" disabled>Disabled</Link>
      </Row>
      <div className="flex w-fit items-center gap-[20px] rounded-lg bg-bg-inverse p-[16px]">
        <Link color="inverse" href="#">Inverse on a dark surface</Link>
      </div>
    </div>
  ),
};

export const ButtonGroups: Story = {
  name: "A15 Button Group",
  render: () => {
    const [active, setActive] = React.useState("week");
    return (
      <div className="flex flex-col gap-[24px]">
        {(["sm", "md", "lg", "xl"] as const).map((s) => (
          <Row key={s} label={`Size ${s}`}>
            <ButtonGroup size={s}>
              {["Day", "Week", "Month"].map((l) => (
                <ButtonGroupSegment
                  key={l}
                  selected={active === l.toLowerCase()}
                  onClick={() => setActive(l.toLowerCase())}
                >
                  {l}
                </ButtonGroupSegment>
              ))}
            </ButtonGroup>
          </Row>
        ))}
        <Row label="With a disabled segment">
          <ButtonGroup>
            <ButtonGroupSegment selected>Live</ButtonGroupSegment>
            <ButtonGroupSegment>Draft</ButtonGroupSegment>
            <ButtonGroupSegment disabled>Archived</ButtonGroupSegment>
          </ButtonGroup>
        </Row>
      </div>
    );
  },
};

export const InlineCtas: Story = {
  name: "A28 Inline CTA",
  render: () => (
    <div className="flex flex-col gap-[24px]">
      <Row label="Sizes">
        {(["sm", "md", "lg"] as const).map((s) => (
          <InlineCta key={s} size={s} href="#">See all reports</InlineCta>
        ))}
      </Row>
      <Row label="Colour and arrow">
        <InlineCta href="#">Brand, right</InlineCta>
        <InlineCta color="neutral" href="#">Neutral, right</InlineCta>
        <InlineCta arrow="down" href="#">Jump to section</InlineCta>
        <InlineCta href="#" disabled>Disabled</InlineCta>
      </Row>
    </div>
  ),
};

export const People: Story = {
  name: "A16b · A16c Avatar groups",
  render: () => (
    <div className="flex flex-col gap-[28px]">
      <Row label="Avatar group — overlap -6 / -8 / -10 / -12">
        {(["xs", "sm", "md", "lg"] as const).map((s) => (
          <AvatarGroup key={s} size={s}>
            <Avatar initials="MR" />
            <Avatar initials="AK" />
            <Avatar initials="SB" />
            <Avatar initials="TZ" />
          </AvatarGroup>
        ))}
      </Row>
      <Row label="Overflow chip and add button">
        <AvatarGroup max={3}>
          <Avatar initials="MR" />
          <Avatar initials="AK" />
          <Avatar initials="SB" />
          <Avatar initials="TZ" />
          <Avatar initials="RH" />
        </AvatarGroup>
        <AvatarGroup onAdd={() => {}}>
          <Avatar initials="MR" />
          <Avatar initials="AK" />
        </AvatarGroup>
      </Row>
      <div className="flex flex-col gap-[16px]">
        <span className="text-caption-sm text-text-tertiary">Avatar label group — SM · MD · LG · XL</span>
        {(["sm", "md", "lg", "xl"] as const).map((s) => (
          <AvatarLabelGroup
            key={s}
            size={s}
            name="Mehedi Hasan"
            subtitle="Design systems"
            avatar={{ initials: "MH" }}
          />
        ))}
      </div>
    </div>
  ),
};
