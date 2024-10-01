import { authAxiosInstance } from '@/app/api/auth/axiosInstance';
import { IGroup } from '@/types/Group';
import { useQuery } from '@tanstack/react-query';

interface UseGroupReturn {
  group: IGroup | undefined; // data가 undefined일 수 있으므로 명시적으로 정의
  isLoading: boolean;
  error: unknown;
  refetch: () => void; // Add refetch function
}

export default function useGroup(groupId: string | string[]): UseGroupReturn {
  const { data, isLoading, error, refetch } = useQuery<IGroup>({
    queryKey: ['getGroup', groupId],
    queryFn: () => {
      return authAxiosInstance
        .get(`/groups/${Array.isArray(groupId) ? groupId[0] : groupId}`) // Ensure groupId is a string
        .then((res) => res.data)
        .then((data) => {
          console.log(data);
          return data;
        })
        .catch((err) => {
          console.error('Failed to fetch groups', err);
          throw err;
        });
    },
    enabled: !!groupId, // Ensure groupId is truthy
  });

  return { group: data, isLoading, error, refetch }; // Return refetch
}
