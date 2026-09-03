import * as React from "react";
import { cx } from "../../lib/cx";

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
    <nav ref={ref} aria-label="Breadcrumb" className={cx("ids-breadcrumb", className)} {...props}>
      {items.map((item, i) => {
        const last = i === items.length - 1;
        const content = last ? (
          <span aria-current="page" className="ids-breadcrumb__current">
            {item.label}
          </span>
        ) : item.href || item.onClick ? (
          <a
            href={item.href}
            onClick={item.onClick}
            className="ids-breadcrumb__link"
          >
            {item.label}
          </a>
        ) : (
          <span className="ids-breadcrumb__crumb">{item.label}</span>
        );

        return (
          <React.Fragment key={i}>
            {content}
            {!last && (
              <span aria-hidden="true" className="ids-breadcrumb__crumb">
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
