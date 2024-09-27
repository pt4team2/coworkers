import { authAxiosInstance } from '@/app/api/auth/axiosInstance';
import { TaskList } from '@/types/Group';
import { useQuery } from '@tanstack/react-query';

export default function useTasks(id: number, groupId: string) {
  const {
    data: tasks,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['getTasks', id, groupId],
    queryFn: () => {
      if (id && groupId) {
        return authAxiosInstance
          .get(`/groups/${groupId}/task-lists/${id}`)
          .then((res) => res.data)
          .then((data) => {
            console.log(data);
            return data;
          })
          .catch((err) => {
            console.error('Failed to fetch tasks', err);
            throw err;
          });
      } else {
        return null;
      }
    },
    enabled: !!groupId && !!id,
  });
  return { tasks, isLoading, error };
}
