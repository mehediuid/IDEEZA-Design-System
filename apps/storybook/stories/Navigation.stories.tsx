import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Tabs, Tab, Breadcrumb, Pagination } from "@ideeza/ui";

/** M14, M19 and M20 — the first half of Molecules — Navigation. */
const meta = { title: "Molecules/Navigation" } satisfies Meta;
export default meta;
type Story = StoryObj<typeof meta>;

const Row = ({ label, children }: { label: string; children: React.ReactNode }) => (
  <div className="flex flex-col gap-[8px]">
    <span className="text-caption-sm text-text-tertiary">{label}</span>
    {children}
  </div>
);

export const TabStyles: Story = {
  name: "M14 Tabs",
  render: () => {
    const [tab, setTab] = React.useState("overview");
    const items = [
      { value: "overview", label: "Overview" },
      { value: "activity", label: "Activity", counter: 12 },
      { value: "members", label: "Members", counter: 4 },
      { value: "settings", label: "Settings" },
    ];
    return (
      <div className="flex w-[640px] flex-col gap-[28px]">
        {(["fill", "line", "line-full", "toggle"] as const).map((v) => (
          <Row key={v} label={v}>
            <Tabs variant={v} value={tab} onValueChange={setTab}>
              {items.map((i) => (
                <Tab key={i.value} value={i.value} counter={i.counter}>
                  {i.label}
                </Tab>
              ))}
              <Tab value="disabled" disabled>Disabled</Tab>
            </Tabs>
          </Row>
        ))}
        <Row label="Sizes — SM · MD · LG">
          <div className="flex flex-col gap-[12px]">
            {(["sm", "md", "lg"] as const).map((s) => (
              <Tabs key={s} variant="fill" size={s} value={tab} onValueChange={setTab}>
                {items.slice(0, 3).map((i) => (
                  <Tab key={i.value} value={i.value}>{i.label}</Tab>
                ))}
              </Tabs>
            ))}
          </div>
        </Row>
        <Row label="Width = FILL">
          <Tabs variant="toggle" fill value={tab} onValueChange={setTab}>
            {items.slice(0, 3).map((i) => (
              <Tab key={i.value} value={i.value} fill>{i.label}</Tab>
            ))}
          </Tabs>
        </Row>
      </div>
    );
  },
};

export const Breadcrumbs: Story = {
  name: "M19 Breadcrumb",
  render: () => (
    <div className="flex flex-col gap-[16px]">
      <Breadcrumb
        items={[
          { label: "Home", href: "#" },
          { label: "Dashboard", href: "#" },
          { label: "Settings", href: "#" },
          { label: "Profile", href: "#" },
          { label: "Current Page" },
        ]}
      />
      <Breadcrumb items={[{ label: "Home", href: "#" }, { label: "Current Page" }]} />
      <Breadcrumb
        separator="›"
        items={[
          { label: "Projects", href: "#" },
          { label: "IDEEZA", href: "#" },
          { label: "Design system" },
        ]}
      />
    </div>
  ),
};

export const Paginations: Story = {
  name: "M20 Pagination",
  render: () => {
    const [sm, setSm] = React.useState(1);
    const [md, setMd] = React.useState(5);
    return (
      <div className="flex flex-col gap-[24px]">
        <Row label="SM — first page, prev disabled">
          <Pagination size="sm" page={sm} pageCount={10} onPageChange={setSm} />
        </Row>
        <Row label="MD — mid run, gaps either side">
          <Pagination size="md" page={md} pageCount={10} onPageChange={setMd} />
        </Row>
        <Row label="Short run — no truncation">
          <Pagination size="sm" page={2} pageCount={4} onPageChange={() => {}} />
        </Row>
      </div>
    );
  },
};
