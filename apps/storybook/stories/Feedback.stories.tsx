import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Alert, InlineMessage, Banner, Snackbar, Toast, StatusBlock, Button, Avatar } from "@ideeza/ui";

/** M01, M05, M03 and M04 — the four ways the system reports something. */
const meta = { title: "Molecules/Feedback" } satisfies Meta;
export default meta;
type Story = StoryObj<typeof meta>;

const severities = ["info", "success", "warning", "error"] as const;

export const Alerts: Story = {
  name: "M01 Alert",
  render: () => (
    <div className="flex w-[520px] flex-col gap-[16px]">
      {severities.map((s) => (
        <Alert
          key={s}
          severity={s}
          title="Alert title"
          description="Alert description text goes here."
          action="View details →"
          onDismiss={() => {}}
        />
      ))}
      <Alert size="sm" severity="info" title="Small, title only" onDismiss={() => {}} />
      <Alert severity="warning" title="No dismiss" description="Not every alert can be closed." />
    </div>
  ),
};

export const InlineMessages: Story = {
  name: "M05 Inline Message",
  render: () => (
    <div className="flex flex-col gap-[12px]">
      {(["helper", "info", "success", "warning", "error"] as const).map((s) => (
        <InlineMessage key={s} severity={s}>
          {s.charAt(0).toUpperCase() + s.slice(1)} message under a field
        </InlineMessage>
      ))}
      <InlineMessage severity="error" hideIcon>
        Without the glyph
      </InlineMessage>
    </div>
  ),
};

export const Banners: Story = {
  name: "M03 Banner",
  render: () => (
    <div className="flex w-[900px] flex-col gap-[12px]">
      {([...severities, "neutral"] as const).map((s) => (
        <Banner
          key={s}
          severity={s}
          title="Scheduled maintenance on Sunday"
          description="The workspace will be read-only between 02:00 and 04:00 UTC."
          actions={<Button size="sm" variant="secondary">Learn more</Button>}
          onDismiss={() => {}}
        />
      ))}
    </div>
  ),
};

export const Snackbars: Story = {
  name: "M04 Snackbar",
  render: () => (
    <div className="flex flex-col items-start gap-[12px]">
      {severities.map((s) => (
        <Snackbar key={s} severity={s} action="UNDO" onActionClick={() => {}} onDismiss={() => {}}>
          Snackbar message
        </Snackbar>
      ))}
      <Snackbar severity="success">Message only</Snackbar>
    </div>
  ),
};

export const Toasts: Story = {
  name: "M02 Toast",
  render: () => (
    <div className="flex w-[570px] flex-col gap-[12px]">
      {(["primary", "gray", "success", "warning", "error"] as const).map((l) => (
        <Toast
          key={l}
          leading={l}
          title="Notification"
          description="Supporting description goes here."
          onDismiss={() => {}}
        />
      ))}
      <Toast
        leading="avatar"
        media={<Avatar size="sm" initials="MH" />}
        title="Mehedi commented"
        description="“Ship it once parity is green.”"
        actions={<Button size="sm" variant="secondary">Reply</Button>}
        onDismiss={() => {}}
      />
      <Toast leading="none" title="No leading slot" description="The text still starts in the same place." onDismiss={() => {}} />
      <Toast leading="progress" progress={60} title="Uploading assets" description="3 of 5 files" onDismiss={() => {}} />
    </div>
  ),
};

export const StatusBlocks: Story = {
  name: "M06 Status Block",
  render: () => (
    <div className="flex flex-col items-start gap-[12px]">
      <StatusBlock status="operational" label="All systems operational" detail="Updated 2 min ago" />
      <StatusBlock status="degraded" label="Degraded performance" detail="Search is slow" />
      <StatusBlock status="outage" label="Partial outage" detail="Exports unavailable" />
      <StatusBlock status="maintenance" label="Scheduled maintenance" detail="Sunday 02:00–04:00 UTC" />
      <StatusBlock status="operational" label="Label only" />
    </div>
  ),
};
