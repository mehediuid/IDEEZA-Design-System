import * as React from "react";

/**
 * `useLayoutEffect` that does not warn on the server.
 *
 * Anything that measures the DOM has to run before paint, which is what
 * `useLayoutEffect` is for — but there is no layout on the server, so React
 * warns. Falling back to `useEffect` there is the standard fix: the effect is
 * a no-op in that environment either way.
 */
export const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? React.useLayoutEffect : React.useEffect;
