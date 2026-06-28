import { useEffect } from 'react';

/**
 * Redirects a React route to a static .html page using a full browser
 * navigation (window.location.replace). The static page is the single
 * canonical version of these subpages.
 */
export default function StaticRedirect({ to }) {
  useEffect(() => {
    window.location.replace(to);
  }, [to]);

  return null;
}