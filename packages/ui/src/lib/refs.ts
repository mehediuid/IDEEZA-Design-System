import type { Ref, MutableRefObject } from "react";

/**
 * Join a forwarded ref with a ref the component needs for itself.
 *
 * A component that measures its own DOM node still has to hand that node to
 * whoever forwarded a ref in, and React allows only one `ref` per element.
 */
export function mergeRefs<T>(...refs: (Ref<T> | undefined)[]) {
  return (node: T | null) => {
    for (const ref of refs) {
      if (typeof ref === "function") ref(node);
      else if (ref) (ref as MutableRefObject<T | null>).current = node;
    }
  };
}
