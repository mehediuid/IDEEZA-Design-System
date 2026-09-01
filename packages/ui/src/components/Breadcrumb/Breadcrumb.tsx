import * as React from "react";
import { cn } from "../../lib/cn";

/**
 * Breadcrumb — mirrors Figma `M19 Breadcrumb` (Molecules — Navigation).
 *
 * One row at gap 8. Every crumb is Body/SM in text/tertiary except the last,
 * which is Body/SM Medium in text/primary — the trail is quiet and only the
 * current page is emphasised. The separator is a literal "/" in the same
 * tertiary colour, not an icon.
 *
 * The last crumb is marked `aria-current="page"` and is not a link, which is
 * what the weight change is saying visually.
 */
export interface BreadcrumbItem {
  label: React.ReactNode;
  href?: string;
  onClick?: () => void;
}

export interface BreadcrumbProps extends Omit<React.HTMLAttributes<HTMLElement>, "children"> {
  items: BreadcrumbItem[];
  /** Figma uses "/"; swap it if a product needs another mark. */
  separator?: React.ReactNode;
}

export const Breadcrumb = React.forwardRef<HTMLElement, BreadcrumbProps>(
  ({ className, items, separator = "/", ...props }, ref) => (
    <nav ref={ref} aria-label="Breadcrumb" className={cn("flex items-center gap-[8px]", className)} {...props}>
      {items.map((item, i) => {
        const last = i === items.length - 1;
        const content = last ? (
          <span aria-current="page" className="text-body-sm-medium text-text-primary">
            {item.label}
          </span>
        ) : item.href || item.onClick ? (
          <a
            href={item.href}
            onClick={item.onClick}
            className="rounded-[2px] text-body-sm text-text-tertiary outline-none transition-colors duration-interaction ease-decelerate hover:text-text-primary hover:underline focus-visible:shadow-[0_0_0_3px_var(--color-focus-halo)]"
          >
            {item.label}
          </a>
        ) : (
          <span className="text-body-sm text-text-tertiary">{item.label}</span>
        );

        return (
          <React.Fragment key={i}>
            {content}
            {!last && (
              <span aria-hidden="true" className="text-body-sm text-text-tertiary">
                {separator}
              </span>
            )}
          </React.Fragment>
        );
      })}
    </nav>
  )
);
Breadcrumb.displayName = "Breadcrumb";
