import { authAxiosInstance } from '@/app/api/auth/axiosInstance';
import { IGroup } from '@/types/Group';
import { useQuery } from '@tanstack/react-query';

interface UseGroupReturn {
  group: IGroup | undefined; // data가 undefined일 수 있으므로 명시적으로 정의
  isLoading: boolean;
  error: unknown;
}

export default function useGroup(groupId: string | string[]): UseGroupReturn {
  const { data, isLoading, error } = useQuery<IGroup>({
    queryKey: ['getGroup', groupId],
    queryFn: () => {
      return authAxiosInstance
        .get(`/groups/${groupId}`) // Ensure groupId is a string
        .then((res) => res.data)
        .then((data) => {
          console.log(data);
          return data;
        })
        .catch((err:any) => {
          console.error('Failed to fetch groups', err);
          throw err;
        });
      },
      enabled: !! groupId, // Ensure groupId is truthy
  });

  return { group: data, isLoading, error }; // Return refetch
}
