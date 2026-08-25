import { useCallback, useEffect, useState } from 'react';

export default function useClimateData(loader) {
  const [state, setState] = useState({
    data: [],
    loading: true,
    error: null,
  });

  const [requestKey, setRequestKey] = useState(0);

  const retry = useCallback(() => {
    setState((current) => ({
      ...current,
      loading: true,
      error: null,
    }));

    setRequestKey((key) => key + 1);
  }, []);

  useEffect(() => {
    const controller = new AbortController();

    loader(controller.signal)
      .then((data) => {
        if (controller.signal.aborted) {
          return;
        }

        setState({
          data,
          loading: false,
          error: null,
        });
      })
      .catch((error) => {
        if (error.name === 'AbortError') {
          return;
        }

        setState((current) => ({
          ...current,
          loading: false,
          error,
        }));
      });

    return () => {
      controller.abort();
    };
  }, [loader, requestKey]);

  return {
    data: state.data,
    loading: state.loading,
    error: state.error,
    retry,
  };
}