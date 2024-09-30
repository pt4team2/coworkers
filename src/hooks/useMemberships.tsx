import { authAxiosInstance } from '@/app/api/auth/axiosInstance';
import { useQuery } from '@tanstack/react-query';
import { IGroup } from '@/types/user';

//user 정보 가져오기
//TODO: 어떤 정보를 받아왔을 때 ex.id , user 정보를 가져올 수 있는가 ?

export default function useMemberships(id?: number) {
  const {
    data: memberships,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['getMemberships'],
    queryFn: () => {
      if (id) {
        return authAxiosInstance
          .get(`/user/memberships`)
          .then((res) => res.data)
          .then((data) => {
            console.log(data);
            return data;
          })
          .catch((err) => {
            console.error('Failed to fetch memberships:', err);
            throw err;
          });
      } else {
        return [];
      }
    },
    enabled: !!id,
  });
  return { memberships, isLoading, error };
}
