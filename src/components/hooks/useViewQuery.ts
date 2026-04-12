import { useQuery } from '@tanstack/react-query';
import apiClient from './api/clients';
import type { ViewQueryProps } from './query.types';

export const useViewQuery = <TData>({ url, queryKey, id }: ViewQueryProps) => {
  return useQuery<TData>({
    queryKey: [...queryKey, id],

    queryFn: async () => {
      const { data } = await apiClient.get<TData>(`${url}/${id}`);
      return data;
    },

    enabled: !!id,
  });
};
