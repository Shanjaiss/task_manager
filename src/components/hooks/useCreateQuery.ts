import { useMutation, useQueryClient } from '@tanstack/react-query';
import apiClient from './api/clients';
import type { BaseQueryProps } from './query.types';

export const useCreateQuery = <TResponse, TPayload>({
  url,
  queryKey,
}: BaseQueryProps) => {
  const queryClient = useQueryClient();

  return useMutation<TResponse, Error, TPayload>({
    mutationFn: async (payload) => {
      const { data } = await apiClient.post<TResponse>(url, payload);

      return data;
    },

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey,
      });
    },
  });
};
