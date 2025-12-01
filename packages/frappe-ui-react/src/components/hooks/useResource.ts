import { useState, useCallback } from "react";

type ResourceOptions<TData, TParams = any> = (
  params?: TParams
) => Promise<TData>;

interface ResourceState<TData, TError> {
  data: TData | null;
  loading: boolean;
  error: TError | null;
}

export interface ResourceOutput<TData, TError>
  extends ResourceState<TData, TError> {
  fetch: (params?: any) => Promise<void>;
  submit: (params?: any) => Promise<void>;
}

export function useResource<TData = any, TError = any>(
  resourceOptions: ResourceOptions<TData>
): ResourceOutput<TData, TError> {
  const [state, setState] = useState<ResourceState<TData, TError>>({
    data: null,
    loading: false,
    error: null,
  });

  const fetch = useCallback(
    async (params?: any) => {
      setState((prevState) => ({ ...prevState, loading: true, error: null }));
      try {
        const result = await resourceOptions(params);
        setState({ data: result, loading: false, error: null });
      } catch (e) {
        setState({ data: null, loading: false, error: e as TError });
        throw e;
      }
    },
    [resourceOptions]
  );

  const submit = fetch;

  return { ...state, fetch, submit };
}
