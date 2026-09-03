import * as React from "react";
import { cx } from "../../lib/cx";
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

    const base = cx("ids-pagination__cell", `ids-pagination__cell--${size}`);

    return (
      <nav ref={ref} aria-label="Pagination" className={cx("ids-pagination", `ids-pagination--${size}`, className)} {...props}>
        <button type="button" aria-label="Previous page" disabled={page <= 1} onClick={() => step(page - 1)}
          className={cx(base, "ids-pagination__cell--rest")}>
          <ChevronDown className="ids-pagination__chevron ids-pagination__chevron--prev" aria-hidden="true" />
        </button>

        {items.map((it, i) =>
          it === "gap" ? (
            <span key={`gap-${i}`} aria-hidden="true" className={cx(base, "ids-pagination__cell--gap")}>
              …
            </span>
          ) : (
            <button
              key={it}
              type="button"
              aria-current={it === page ? "page" : undefined}
              onClick={() => step(it)}
              className={cx(
                base,
                it === page ? "ids-pagination__cell--current" : "ids-pagination__cell--rest"
              )}
            >
              {it}
            </button>
          )
        )}

        <button type="button" aria-label="Next page" disabled={page >= pageCount} onClick={() => step(page + 1)}
          className={cx(base, "ids-pagination__cell--rest")}>
          <ChevronDown className="ids-pagination__chevron ids-pagination__chevron--next" aria-hidden="true" />
        </button>
      </nav>
    );
  }
);
Pagination.displayName = "Pagination";
