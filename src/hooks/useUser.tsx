import { authAxiosInstance } from '@/app/api/auth/axiosInstance';
import { useQuery } from '@tanstack/react-query';
import { IUser } from '@/types/user';

export default function useUser(id?: number) {
  const {
    data: userData,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['getUser'],
    queryFn: async () => {
      if (id) {
        return authAxiosInstance
          .get(`/user`)
          .then((res) => res.data)
          .catch((err) => {
            console.error('Failed to fetch member list:', err);
            throw err;
          });
      } else {
        return [];
      }
    },
    enabled: !!id,
  });
  return { userData, isLoading, error };
}
