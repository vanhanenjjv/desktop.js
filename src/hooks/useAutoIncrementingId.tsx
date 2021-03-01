import React from 'react';


export function useAutoIncrementingId(initialValue?: number): () => number {
  const [id, setId] = React.useState(initialValue ?? 0);

  return () => {
    const n = id;
    setId(n + 1);

    return n;
  }
}
