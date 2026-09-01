import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { StateView, LoadingState, SkeletonLayout, Button, statePresets } from "@ideeza/ui";

/** M48–M59 — ten states on one shell, plus M50 Loading and M51 Skeleton. */
const meta = { title: "Molecules/States" } satisfies Meta;
export default meta;
type Story = StoryObj<typeof meta>;

const copy: Record<string, { title: string; description: string; actions: React.ReactNode }> = {
  empty: {
    title: "Nothing here yet",
    description: "Get started by creating your first item.",
    actions: <Button size="sm">Create item</Button>,
  },
  error: {
    title: "Something went wrong",
    description: "We hit an unexpected error. Please try again.",
    actions: (
      <>
        <Button size="sm" variant="secondary">Contact support</Button>
        <Button size="sm">Try again</Button>
      </>
    ),
  },
  success: {
    title: "All set!",
    description: "Your action completed successfully.",
    actions: <Button size="sm">Continue</Button>,
  },
  "no-results": {
    title: "No results found",
    description: "We couldn't find anything matching your search.",
    actions: <Button size="sm" variant="secondary">Clear filters</Button>,
  },
  "permission-denied": {
    title: "Access denied",
    description: "You don't have permission to view this.",
    actions: (
      <>
        <Button size="sm" variant="secondary">Go back</Button>
        <Button size="sm">Request access</Button>
      </>
    ),
  },
  "no-connection": {
    title: "You're offline",
    description: "Check your internet connection and try again.",
    actions: <Button size="sm">Retry</Button>,
  },
  maintenance: {
    title: "Under maintenance",
    description: "We're making improvements. Service should be back shortly.",
    actions: <Button size="sm" variant="secondary">Status page</Button>,
  },
  "not-found": {
    title: "Page not found",
    description: "The page you're looking for doesn't exist.",
    actions: (
      <>
        <Button size="sm" variant="secondary">Go back</Button>
        <Button size="sm">Home</Button>
      </>
    ),
  },
  "coming-soon": {
    title: "Coming soon",
    description: "We're working on something exciting.",
    actions: <Button size="sm">Notify me</Button>,
  },
  "server-error": {
    title: "Server error",
    description: "Our servers are having trouble responding.",
    actions: (
      <>
        <Button size="sm" variant="secondary">Contact support</Button>
        <Button size="sm">Try again</Button>
      </>
    ),
  },
};

export const AllStates: Story = {
  name: "M48–M59 States",
  render: () => (
    <div className="grid grid-cols-2 gap-[24px]">
      {(Object.keys(statePresets) as Array<keyof typeof statePresets>).map((k) => (
        <div key={k} className="rounded-lg border border-border-subtle">
          <StateView preset={k} {...copy[k]} />
        </div>
      ))}
    </div>
  ),
};

export const Loading: Story = {
  name: "M50 Loading",
  render: () => (
    <div className="flex flex-col items-start gap-[24px]">
      <div className="rounded-lg border border-border-subtle">
        <LoadingState variant="page" description="Fetching your data, just a moment…" />
      </div>
      <div className="rounded-lg border border-border-subtle">
        <LoadingState variant="inline" label="Loading…" />
      </div>
      <div className="rounded-lg border border-border-subtle">
        <LoadingState variant="compact" label="Loading…" />
      </div>
    </div>
  ),
};

export const Skeletons: Story = {
  name: "M51 Skeleton",
  render: () => (
    <div className="flex flex-wrap items-start gap-[24px]">
      <SkeletonLayout layout="card" />
      <SkeletonLayout layout="chart" />
      <div className="flex flex-col gap-[12px]">
        <SkeletonLayout layout="list-item" />
        <SkeletonLayout layout="list-item" />
      </div>
      <SkeletonLayout layout="article" />
    </div>
  ),
};
