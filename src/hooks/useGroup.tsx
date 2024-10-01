import { authAxiosInstance } from '@/app/api/auth/axiosInstance';
import { IGroup } from '@/types/Group';
import { useQuery } from '@tanstack/react-query';

{
  /*
  데이터 연동 
  {
  "id": 894,
  "name": "회계팀",
  "image": "https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/Coworkers/user/684/1b6ad58522136ecd25a22cb5cc166203.jpg.",
  "createdAt": "2024-09-21T18:00:00+09:00",
  "updatedAt": "2024-09-21T18:00:00+09:00",
  "teamId": "7-2",
  "members": [
    {
      "userId": 684,
      "groupId": 894,
      "userName": "테스트",
      "userEmail": "wow@naver.com",
      "userImage": null,
      "role": "ADMIN"
    },
    {
      "userId": 694,
      "groupId": 894,
      "userName": "김원필",
      "userEmail": "test4@email.com",
      "userImage": null,
      "role": "MEMBER"
    }
  ],
  "taskLists": []
} */
}
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
          .get(`/groups/${groupId}`)
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
  return { group: data, isLoading, error };
}
