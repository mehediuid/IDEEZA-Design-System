/**
 * IDEEZA Design System — the published package.
 *
 * The workspace splits into @ideeza/tokens, @ideeza/ui and @ideeza/icons
 * because that split is useful while building. It is not useful to install:
 * three packages that must be kept on matching versions is three chances to
 * get it wrong. So this one bundles all three, and nothing here re-exports a
 * dependency a consumer would also have to add.
 *
 *   import { Button, Input, Add01 } from "ideeza-design-system";
 *   import "ideeza-design-system/styles.css";
 *
 * Icons are namespaced under `Icons` as well as exported flat, because a few
 * icon names (Link, Menu) collide with component names.
 */
export * from "@ideeza/ui";
export * from "@ideeza/tokens";
export * as Icons from "@ideeza/icons";
export { IconBase, type IconProps } from "@ideeza/icons";
