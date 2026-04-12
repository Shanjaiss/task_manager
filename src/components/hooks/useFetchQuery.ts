import { useQuery } from '@tanstack/react-query';
import apiClient from './api/clients';
import type { BaseQueryProps } from './query.types';

export const useFetchQuery = <TData>({ url, queryKey }: BaseQueryProps) => {
  return useQuery<TData>({
    queryKey,

    queryFn: async () => {
      const { data } = await apiClient.get<TData>(url);
      return data;
    },
  });
};
