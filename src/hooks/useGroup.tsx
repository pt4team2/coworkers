import axios from '@/services/axios';
import { useQuery } from '@tanstack/react-query';

export default function useMemberList(id: string) {
  const {
    data: memberList,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['getMemberList', id],
    queryFn: () => {
      if (id) {
        return axios
          .get(`/groups?id=${id}`)
          .then((res) => res.data)
          .then((data) => {
            console.log(data.members);
            return data.members;
          })
          .catch((err)=>{
            console.error("Failed to fetch memberlist:", err);
            throw err;
          });
      } else {
        return [];
      }
    },
    enabled:!!id,
  });
  return { memberList: memberList || [], isLoading, error };
}
