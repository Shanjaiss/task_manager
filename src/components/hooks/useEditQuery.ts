import { useMutation, useQueryClient } from '@tanstack/react-query';

import apiClient from './api/clients';
import type { BaseQueryProps } from './query.types';
import { showToast } from '../toast/toast';

// Payload type
interface EditPayload<T> {
  id: string | number;
  payload: T;
}

// Props type
interface UseEditQueryProps extends BaseQueryProps {
  successMessage?: string;
}

export const useEditQuery = <TResponse, TPayload>({
  url,
  queryKey,
  successMessage = 'Updated successfully',
}: UseEditQueryProps) => {
  const queryClient = useQueryClient();

  return useMutation<TResponse, any, EditPayload<TPayload>>({
    mutationFn: async ({ id, payload }) => {
      const { data } = await apiClient.put<TResponse>(`${url}/${id}`, payload);

      return data;
    },

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey,
      });

      showToast('success', successMessage);
    },

    onError: (error: any) => {
      showToast('error', error?.response?.data?.message || 'Update failed');
    },
  });
};
