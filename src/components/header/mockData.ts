const mockData = {
  teamId: 'team123',
  image: 'image_url',
  nickname: '장아영',
  updatedAt: '2024-09-04T09:02:36.064Z',
  createdAt: '2024-09-04T09:02:36.064Z',
  email: 'john.doe@example.com',
  id: 1,
  memberships: [
    {
      group: {
        teamId: 'teamA',
        updatedAt: '2024-09-04T09:02:36.064Z',
        createdAt: '2024-09-04T09:02:36.064Z',
        image:
          'https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/Fandom-K/idol/1725443545056/26c93e168bf7626685761034b7980ab3.jpg',
        name: '회계팀',
        id: 101,
      },
      role: 'ADMIN',
      userImage: 'user_image_url',
      userEmail: 'john.doe@example.com',
      userName: 'John Doe',
      groupId: 101,
      userId: 1,
    },
    {
      group: {
        teamId: 'teamB',
        updatedAt: '2024-09-04T09:02:36.064Z',
        createdAt: '2024-09-04T09:02:36.064Z',
        image:
          'https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/Fandom-K/idol/1725445664665/563f0b714e90f9195c1d63b09f5fb8e1.jpg',
        name: '경영관리팀',
        id: 102,
      },
      role: 'MEMBER',
      userImage: 'user_image_url',
      userEmail: 'john.doe@example.com',
      userName: 'John Doe',
      groupId: 102,
      userId: 1,
    },
    {
      group: {
        teamId: 'teamB',
        updatedAt: '2024-09-04T09:02:36.064Z',
        createdAt: '2024-09-04T09:02:36.064Z',
        image:
          'https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/Fandom-K/idol/1725445664665/563f0b714e90f9195c1d63b09f5fb8e1.jpg',
        name: '운영관리팀',
        id: 102,
      },
      role: 'MEMBER',
      userImage: 'user_image_url',
      userEmail: 'john.doe@example.com',
      userName: 'John Doe',
      groupId: 102,
      userId: 1,
    },
  ],
};

export default mockData;
