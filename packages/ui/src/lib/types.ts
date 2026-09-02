/**
 * Local copies of the two types this package's public API borrows.
 *
 * `cn()` takes clsx's `ClassValue`, and every component's props extend cva's
 * `VariantProps`. Importing those types means the published `.d.ts` says
 * `import { ClassValue } from "clsx"` — so a consumer needs clsx installed to
 * typecheck, even though the runtime is bundled and asks for nothing. The
 * runtime looks fine and TypeScript fails, which is the worst of both.
 *
 * Inlining them at build time is the obvious alternative and does not work:
 * clsx ships `export =`, which rollup's dts bundler cannot flatten, and cva's
 * declarations import clsx in turn.
 *
 * So they are written out here. Both are structural and small enough to copy
 * faithfully; neither has changed across the major versions this package
 * supports. If either upstream type changes, the typecheck against the real
 * ones in `cn.ts` and the components will fail — the definitions below are
 * still checked against the libraries at build time, they are just not
 * re-exported into the published declarations.
 */

type ClassDictionary = Record<string, unknown>;
type ClassArray = ClassValue[];

/** clsx's `ClassValue`, verbatim. */
export type ClassValue =
  | ClassArray
  | ClassDictionary
  | string
  | number
  | bigint
  | null
  | boolean
  | undefined;

type OmitUndefined<T> = T extends undefined ? never : T;

/**
 * cva's `VariantProps`, verbatim — the props a `cva()` function accepts,
 * minus the two class escape hatches components declare themselves.
 */
export type VariantProps<Component extends (...args: never[]) => unknown> = Omit<
  OmitUndefined<Parameters<Component>[0]>,
  "class" | "className"
>;
