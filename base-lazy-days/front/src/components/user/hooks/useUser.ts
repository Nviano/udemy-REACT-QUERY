import { AxiosResponse } from 'axios';
import { axiosInstance, getJWTHeader } from 'axiosInstance';
import { useQuery, useQueryClient } from 'react-query';
import { queryKeys } from 'react-query/constants';
import type { User } from 'shared/types';
import { clearStoredUser, getStoredUser, setStoredUser } from 'user-storage';

async function getUser(
  user: User | null,
  signal: AbortSignal,
): Promise<User | null> {
  if (!user) return null;
  const { data }: AxiosResponse<{ user: User }> = await axiosInstance.get(
    `/user/${user.id}`,
    {
      headers: getJWTHeader(user),
      signal,
    },
  );
  return data.user;
}

interface UseUser {
  user: User | null;
  updateUser: (user: User) => void;
  clearUser: () => void;
}

export function useUser(): UseUser {
  const queryClient = useQueryClient();

  const { data: user } = useQuery(
    [queryKeys.user],
    ({ signal }) => getUser(user, signal),
    {
      initialData: getStoredUser,
      onSuccess: (userData: User | null) => {
        if (!userData) {
          return clearStoredUser();
        }
        setStoredUser(userData);
        return null;
      },
    },
  );

  // meant to be called from useAuth
  function updateUser(newUser: User): void {
    queryClient.setQueryData([queryKeys.user], newUser);
  }

  // meant to be called from useAuth
  function clearUser() {
    queryClient.setQueryData([queryKeys.user], null);
    queryClient.removeQueries([queryKeys.appointments, queryKeys.user]);
  }

  return { user, updateUser, clearUser };
}
