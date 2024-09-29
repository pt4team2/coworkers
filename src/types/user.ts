interface IGroup {
  teamId: string;
  updatedAt: string;
  createdAt: string;
  image: string;
  name: string;
  id: number;
}

interface IMembership {
  group: IGroup;
  role: 'ADMIN' | 'MEMBER'; // 역할이 더 추가될 수 있으면 이곳에 추가
  userImage: string;
  userEmail: string;
  userName: string;
  groupId: number;
  userId: number;
}

interface IUser {
  teamId: string;
  image: string;
  nickname: string;
  updatedAt: string;
  createdAt: string;
  email: string;
  id: number;
  memberships: IMembership[];
}

export type { IGroup, IMembership, IUser };
