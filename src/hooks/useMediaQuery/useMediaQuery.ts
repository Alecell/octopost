import { useEffect, useState } from 'react';

/**
 * Hook to match the media query.
 * @param {string} queryString The media query string. Should be in the format 'media-query: 600px'.
 * @returns {boolean} Returns true if the media query matches, otherwise false.
 */
export function useMediaQuery(queryString: string): boolean {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia(`(${queryString})`);
    setMatches(mediaQuery.matches);

    const handleChange = (event: MediaQueryListEvent): void => {
      setMatches(event.matches);
    };

    mediaQuery.addEventListener('change', handleChange);

    return () => mediaQuery.removeEventListener('change', handleChange);
  }, [queryString]);

  return matches;
}
