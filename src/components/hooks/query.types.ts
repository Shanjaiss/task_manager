import type { QueryKey } from '@tanstack/react-query';

export interface BaseQueryProps {
  url: string;
  queryKey: QueryKey;
}

export interface ViewQueryProps extends BaseQueryProps {
  id: string | number;
}

export interface EditQueryProps<TPayload> extends BaseQueryProps {
  id: string | number;
  payload: TPayload;
}
