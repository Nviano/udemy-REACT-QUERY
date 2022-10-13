import { axiosInstance } from 'axiosInstance';
import { Dispatch, SetStateAction, useCallback, useState } from 'react';
import { useQuery } from 'react-query';
import { queryKeys } from 'react-query/constants';
import type { Staff } from 'shared/types';

import { filterByTreatment } from '../utils';

async function getStaff(): Promise<Staff[]> {
  const { data } = await axiosInstance.get('/staff');
  return data;
}

interface UseStaff {
  staff: Staff[];
  filter: string;
  setFilter: Dispatch<SetStateAction<string>>;
}

export function useStaff(): UseStaff {
  const [filter, setFilter] = useState('all');

  const staffFilter = useCallback(
    (data: Staff[]) => filterByTreatment(data, filter),
    [filter],
  );

  const { data: staff = [] } = useQuery([queryKeys.staff], getStaff, {
    select: filter === 'all' ? undefined : staffFilter,
  });

  return { staff, filter, setFilter };
}
