import { useMutation, useQueryClient } from '@tanstack/react-query';
import apiClient from './api/clients';
import { showToast } from '../toast/toast';

interface CreateProps {
  url: string;
  queryKey: string[];
  successMessage?: string;
}

export const useCreateQuery = <TResponse, TPayload>({
  url,
  queryKey,
  successMessage = 'Created successfully',
}: CreateProps) => {
  const queryClient = useQueryClient();

  return useMutation<TResponse, any, TPayload>({
    mutationFn: async (payload) => {
      const { data } = await apiClient.post<TResponse>(url, payload);

      return data;
    },

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey,
      });

      showToast('success', successMessage);
    },

    onError: (error: any) => {
      showToast(
        'error',
        error?.response?.data?.message || 'Something went wrong'
      );
    },
  });
};
