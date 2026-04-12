import { useMutation, useQueryClient } from '@tanstack/react-query';
import apiClient from './api/clients';
import type { BaseQueryProps } from './query.types';

interface EditPayload<T> {
  id: string | number;
  payload: T;
}

export const useEditQuery = <TResponse, TPayload>({
  url,
  queryKey,
}: BaseQueryProps) => {
  const queryClient = useQueryClient();

  return useMutation<TResponse, Error, EditPayload<TPayload>>({
    mutationFn: async ({ id, payload }) => {
      const { data } = await apiClient.put<TResponse>(`${url}/${id}`, payload);

      return data;
    },

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey,
      });
    },
  });
};
