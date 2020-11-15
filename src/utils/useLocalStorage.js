import React from 'react';

export default function useStickyState(defaultValue, key) {
  const [value, setValue] = React.useState(() => {
    const stickyValue =
      typeof window !== 'undefined' ? window.localStorage.getItem(key) : null;
    return stickyValue !== null ? JSON.parse(stickyValue) : defaultValue;
  });

  React.useEffect(() => {
    window.localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
}
