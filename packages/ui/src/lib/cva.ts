import { cva as cvaBase } from "class-variance-authority";
import type { ClassValue } from "./types";

/**
 * `cva`, with its type signature restated in terms of our own `ClassValue`.
 *
 * Every component exports its variants function — `buttonVariants` and the
 * rest — and the inferred return type of the real `cva` mentions cva's own
 * `ClassProp`. That single reference puts `import ... from
 * "class-variance-authority/types"` into the published declarations, which
 * means a consumer has to install cva to typecheck a package whose runtime
 * asks for nothing at all. Inlining it at build time does not work: the
 * subpath resists rollup's dts bundler, and cva's declarations import clsx,
 * which ships `export =` and resists it too.
 *
 * So the signature is written out here instead. It is a transcription of
 * cva 0.7's public types, not a reinterpretation — the runtime is still cva
 * itself, and the cast below is checked against the real declarations at
 * build time, so a signature change upstream fails the typecheck rather than
 * passing quietly.
 */

export type ClassProp =
  | { class?: ClassValue; className?: never }
  | { class?: never; className?: ClassValue }
  | { class?: never; className?: never };

type ConfigSchema = Record<string, Record<string, ClassValue>>;
type StringToBoolean<T> = T extends "true" | "false" ? boolean : T;

type ConfigVariants<T extends ConfigSchema> = {
  [Variant in keyof T]?: StringToBoolean<keyof T[Variant]> | null | undefined;
};
type ConfigVariantsMulti<T extends ConfigSchema> = {
  [Variant in keyof T]?:
    | StringToBoolean<keyof T[Variant]>
    | StringToBoolean<keyof T[Variant]>[]
    | undefined;
};

type Config<T> = T extends ConfigSchema
  ? {
      variants?: T;
      defaultVariants?: ConfigVariants<T>;
      compoundVariants?: (T extends ConfigSchema
        ? (ConfigVariants<T> | ConfigVariantsMulti<T>) & ClassProp
        : ClassProp)[];
    }
  : never;

type Props<T> = T extends ConfigSchema ? ConfigVariants<T> & ClassProp : ClassProp;

export const cva = cvaBase as <T>(
  base?: ClassValue,
  config?: Config<T>
) => (props?: Props<T>) => string;
