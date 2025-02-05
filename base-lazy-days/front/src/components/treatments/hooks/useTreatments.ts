import { axiosInstance } from 'axiosInstance';
import { useQuery, useQueryClient } from 'react-query';
import { queryKeys } from 'react-query/constants';
import type { Treatment } from 'shared/types';

// for when we need a query function for useQuery
async function getTreatments(): Promise<Treatment[]> {
  const { data } = await axiosInstance.get('/treatments');
  return data;
}

export function useTreatments(): Treatment[] {
  const fallback = [];
  const { data = fallback } = useQuery([queryKeys.treatments], getTreatments);
  // TODO: get data from server via useQuery
  return data;
}

export function usePrefetchTreatments(): void {
  const queryClient = useQueryClient();
  queryClient.prefetchQuery([queryKeys.treatments], getTreatments);
}
