import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Avatar, Tag, Spinner, Skeleton, Divider } from "@ideeza/ui";

/**
 * The five Display atoms added alongside Badge, shown together so the sizes
 * can be compared against Figma `Atoms — Display` at 1:1.
 */
const meta = {
  title: "Atoms/Display",
} satisfies Meta;
export default meta;
type Story = StoryObj<typeof meta>;

const Row = ({ label, children }: { label: string; children: React.ReactNode }) => (
  <div className="flex flex-col gap-[8px]">
    <span className="text-caption-sm text-text-tertiary">{label}</span>
    <div className="flex flex-wrap items-center gap-[16px]">{children}</div>
  </div>
);

export const AvatarSizes: Story = {
  name: "A16 Avatar",
  render: () => (
    <div className="flex flex-col gap-[24px]">
      <Row label="Initials — 2XS 20 · XS 24 · SM 32 · MD 40 · LG 48 · XL 64">
        {(["2xs", "xs", "sm", "md", "lg", "xl"] as const).map((s) => (
          <Avatar key={s} size={s} initials="MR" />
        ))}
      </Row>
      <Row label="Icon fallback">
        {(["2xs", "xs", "sm", "md", "lg", "xl"] as const).map((s) => (
          <Avatar key={s} size={s} alt="User" />
        ))}
      </Row>
      <Row label="Status dot">
        <Avatar initials="MR" status="online" />
        <Avatar initials="MR" status="busy" />
        <Avatar initials="MR" status="away" />
        <Avatar initials="MR" status="offline" />
      </Row>
      <Row label="Interactive — hover wash, focus halo, disabled">
        <Avatar initials="MR" onClick={() => {}} />
        <Avatar initials="MR" onClick={() => {}} disabled />
      </Row>
    </div>
  ),
};

export const Tags: Story = {
  name: "A18 Tag",
  render: () => (
    <div className="flex flex-col gap-[24px]">
      <Row label="Sizes — SM 24 · MD 28 · LG 32">
        <Tag size="sm">Tag</Tag>
        <Tag size="md">Tag</Tag>
        <Tag size="lg">Tag</Tag>
      </Row>
      <Row label="States">
        <Tag onSelect={() => {}}>Default</Tag>
        <Tag selected onSelect={() => {}}>Selected</Tag>
        <Tag disabled>Disabled</Tag>
      </Row>
      <Row label="Leading — dot · avatar · icon">
        <Tag dot>Dot</Tag>
        <Tag avatar={<Avatar size="2xs" initials="MR" />}>Avatar</Tag>
        <Tag leftIcon={<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="9" /></svg>}>Icon</Tag>
      </Row>
      <Row label="Dismissible">
        <Tag onDismiss={() => {}}>Remove me</Tag>
        <Tag selected onSelect={() => {}} onDismiss={() => {}}>Both</Tag>
      </Row>
    </div>
  ),
};

export const Spinners: Story = {
  name: "A20 Spinner",
  render: () => (
    <div className="flex flex-col gap-[24px]">
      <Row label="Arc — SM 16 · MD 20 · LG 24 · XL 32">
        {(["sm", "md", "lg", "xl"] as const).map((s) => (
          <Spinner key={s} size={s} />
        ))}
      </Row>
      <Row label="Styles — arc · ring · dots">
        <Spinner variant="arc" size="lg" />
        <Spinner variant="ring" size="lg" />
        <Spinner variant="dots" size="lg" />
      </Row>
      <Row label="Colours">
        {(["brand", "neutral", "blue", "success", "warning", "error"] as const).map((c) => (
          <Spinner key={c} color={c} size="lg" />
        ))}
      </Row>
      <div className="flex w-fit items-center gap-[16px] rounded-lg bg-bg-inverse p-[16px]">
        <span className="text-caption-sm text-text-inverse">Inverse</span>
        <Spinner color="inverse" size="lg" />
      </div>
    </div>
  ),
};

export const Skeletons: Story = {
  name: "A21 Skeleton",
  render: () => (
    <div className="flex flex-col gap-[24px]">
      <Row label="Rectangle · Line · Circle — MD">
        <Skeleton shape="rectangle" />
        <div className="flex flex-col gap-[8px]">
          <Skeleton shape="line" />
          <Skeleton shape="line" size="sm" />
        </div>
        <Skeleton shape="circle" />
      </Row>
      <Row label="Avatar — SM · MD · LG">
        {(["sm", "md", "lg"] as const).map((s) => (
          <Skeleton key={s} shape="avatar" size={s} />
        ))}
      </Row>
      <Row label="Card — SM · MD">
        <Skeleton shape="card" size="sm" />
        <Skeleton shape="card" size="md" />
      </Row>
      <Row label="Static (animate=false)">
        <Skeleton shape="rectangle" size="sm" animate={false} />
      </Row>
    </div>
  ),
};

export const Dividers: Story = {
  name: "A24 Divider",
  render: () => (
    <div className="flex w-[400px] flex-col gap-[24px]">
      <Row label="Plain rule">
        <Divider />
      </Row>
      <div className="flex flex-col gap-[16px]">
        <span className="text-caption-sm text-text-tertiary">With content — center · left · right</span>
        <Divider>OR</Divider>
        <Divider align="left">Section</Divider>
        <Divider align="right">Section</Divider>
      </div>
      <div className="flex flex-col gap-[16px]">
        <span className="text-caption-sm text-text-tertiary">Background fill</span>
        <Divider variant="fill">Archived</Divider>
      </div>
      <div className="flex flex-col gap-[8px]">
        <span className="text-caption-sm text-text-tertiary">Vertical</span>
        <div className="flex h-[80px] items-center gap-[16px]">
          <span className="text-body-sm">Left</span>
          <Divider orientation="vertical" />
          <span className="text-body-sm">Right</span>
        </div>
      </div>
    </div>
  ),
};
