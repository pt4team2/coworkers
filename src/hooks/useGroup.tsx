import { authAxiosInstance } from '@/app/api/auth/axiosInstance';
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

export default function useGroup(groupId: string | string[]) {
  const {
    data: group,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['getGroup', groupId],
    queryFn: () => {
      if (groupId) {
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
      } else {
        return null;
      }
    },
    enabled: !!groupId,
  });
  return { group, isLoading, error };
}
