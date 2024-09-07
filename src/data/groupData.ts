//멤버리스트 -> BASE_URL/{teamId}/groups/{id} //

const groupData = {
  teamId: 'team_001',
  updatedAt: '2024-09-07T03:37:04.132Z',
  createdAt: '2024-09-07T03:37:04.132Z',
  image: 'https://example.com/team_image.png',
  name: '개발팀',
  id: 1,
  members: [
    {
      role: 'ADMIN',
      userImage: 'https://example.com/user1.png',
      userEmail: 'admin1@company.com',
      userName: '김철수',
      groupId: 1,
      userId: 1001,
    },
    {
      role: 'MEMBER',
      userImage: 'https://example.com/user2.png',
      userEmail: 'user2@company.com',
      userName: '박영희',
      groupId: 1,
      userId: 1002,
    },
    {
      role: 'MEMBR',
      userImage: 'https://example.com/user3.png',
      userEmail: 'user3@company.com',
      userName: '이민호',
      groupId: 1,
      userId: 1003,
    },
    {
      role: 'MEMBER',
      userImage: 'https://example.com/user4.png',
      userEmail: 'user4@company.com',
      userName: '정수진',
      groupId: 1,
      userId: 1004,
    },
    {
      role: 'MEMBER',
      userImage: 'https://example.com/user5.png',
      userEmail: 'user5@company.com',
      userName: '홍길동',
      groupId: 1,
      userId: 1005,
    },
    {
      role: 'MEMBER',
      userImage: 'https://example.com/user6.png',
      userEmail: 'user6@company.com',
      userName: '최영수',
      groupId: 1,
      userId: 1006,
    },
    {
      role: 'MEMBER',
      userImage: 'https://example.com/user7.png',
      userEmail: 'user7@company.com',
      userName: '김하나',
      groupId: 1,
      userId: 1007,
    },
  ],
  taskLists: [
    {
      displayIndex: 0,
      groupId: 1,
      updatedAt: '2024-09-07T03:37:04.132Z',
      createdAt: '2024-09-07T03:37:04.132Z',
      name: '프로젝트 관리',
      id: 1,
      tasks: ['기획서 작성', '디자인 검토', '코드 리뷰', '개발 환경 설정'],
    },
  ],
};

export { groupData };
