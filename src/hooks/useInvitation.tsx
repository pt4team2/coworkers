import { useQuery } from '@tanstack/react-query';
import { authAxiosInstance } from '@/app/api/auth/axiosInstance';

interface UseInvitationReturn {
  link: string;
  isLoading: boolean;
  error: unknown;
}

export default function useInvitation(
  groupId: number | undefined,
): UseInvitationReturn {
  const { data, isLoading, error } = useQuery({
    queryKey: ['getInvitationLink', groupId],
    queryFn: () => {
      return authAxiosInstance
        .get(`/groups/${groupId}/invitation`)
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
    enabled: !!groupId,
  });
  return { link: data, isLoading, error };
}
