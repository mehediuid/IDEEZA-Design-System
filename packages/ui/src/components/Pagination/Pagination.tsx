import * as React from "react";
import { cn } from "../../lib/cn";
import { ChevronDown } from "../../lib/icons";

/**
 * Pagination — mirrors Figma `M20 Pagination` (Molecules — Navigation).
 *
 * Figma variant map:
 * - Size → `size` (SM 32 · MD 40)
 *
 * Square cells at radius 8 — 32 with a 4px gap, 40 with 6. The current page
 * sits on bg/brand-subtle with a text/brand label; every other cell is
 * transparent with text/primary. Figma shows the truncated run
 * `1 2 3 … 8 9 10`, which is what the ellipsis logic reproduces: always the
 * first and last, a window either side of the current page, and a gap where
 * the run breaks.
 *
 * Prev and next are the same cell with a rotated chevron, disabled at the
 * ends rather than hidden, so the row does not reflow as you page.
 */
export type PaginationSize = "sm" | "md";

const cell = {
  sm: "size-[32px] rounded-[8px] text-body-sm-medium",
  md: "size-[40px] rounded-[8px] text-body-md-medium",
} as const;

const gap = { sm: "gap-[4px]", md: "gap-[6px]" } as const;

/** 1 … 4 5 6 … 10 — first, last, and `window` pages either side of current. */
export function paginationRange(current: number, total: number, window = 1): Array<number | "gap"> {
  const pages = new Set<number>([1, total]);
  for (let i = current - window; i <= current + window; i++) if (i >= 1 && i <= total) pages.add(i);
  const sorted = [...pages].sort((a, b) => a - b);
  const out: Array<number | "gap"> = [];
  let prev = 0;
  for (const p of sorted) {
    if (prev && p - prev > 1) out.push("gap");
    out.push(p);
    prev = p;
  }
  return out;
}

export interface PaginationProps extends Omit<React.HTMLAttributes<HTMLElement>, "onChange"> {
  size?: PaginationSize;
  page: number;
  pageCount: number;
  onPageChange?: (page: number) => void;
  /** Pages shown either side of the current one before the run breaks. */
  siblingCount?: number;
}

export const Pagination = React.forwardRef<HTMLElement, PaginationProps>(
  ({ className, size = "sm", page, pageCount, onPageChange, siblingCount = 1, ...props }, ref) => {
    const items = paginationRange(page, pageCount, siblingCount);
    const step = (to: number) => onPageChange?.(Math.min(pageCount, Math.max(1, to)));

    const base = cn(
      "inline-flex items-center justify-center font-sans outline-none",
      "transition-colors duration-interaction ease-decelerate",
      "focus-visible:shadow-[0_0_0_3px_var(--color-focus-halo)]",
      "disabled:pointer-events-none disabled:text-text-disabled",
      cell[size]
    );

    return (
      <nav ref={ref} aria-label="Pagination" className={cn("flex items-center", gap[size], className)} {...props}>
        <button type="button" aria-label="Previous page" disabled={page <= 1} onClick={() => step(page - 1)}
          className={cn(base, "text-text-primary hover:bg-bg-subtle")}>
          <ChevronDown className="size-[16px] rotate-90" aria-hidden="true" />
        </button>

        {items.map((it, i) =>
          it === "gap" ? (
            <span key={`gap-${i}`} aria-hidden="true" className={cn(base, "text-text-tertiary")}>
              …
            </span>
          ) : (
            <button
              key={it}
              type="button"
              aria-current={it === page ? "page" : undefined}
              onClick={() => step(it)}
              className={cn(
                base,
                it === page
                  ? "bg-bg-brand-subtle text-text-brand"
                  : "text-text-primary hover:bg-bg-subtle"
              )}
            >
              {it}
            </button>
          )
        )}

        <button type="button" aria-label="Next page" disabled={page >= pageCount} onClick={() => step(page + 1)}
          className={cn(base, "text-text-primary hover:bg-bg-subtle")}>
          <ChevronDown className="size-[16px] -rotate-90" aria-hidden="true" />
        </button>
      </nav>
    );
  }
);
Pagination.displayName = "Pagination";
