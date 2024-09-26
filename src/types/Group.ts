// Team의 멤버 타입 정의
interface TeamMember {
  role: 'ADMIN' | 'MEMBER'; // 역할은 ADMIN 또는 MEMBER
  userImage: string; // 사용자 이미지 URL
  userEmail: string; // 사용자 이메일
  userName: string; // 사용자 이름
  groupId: number; // 그룹 ID
  userId: number; // 사용자 ID
}

// Task 리스트 타입 정의
interface TaskList {
  displayIndex: number; // 화면에서의 순서 인덱스
  groupId: number; // 그룹 ID
  updatedAt: string; // 업데이트 일자
  createdAt: string; // 생성 일자
  name: string; // 할 일 리스트 이름
  id: number; // 할 일 리스트 ID
  tasks: string[]; // 할 일(Task) 배열 (간단히 string으로 설정)
}

// Team의 전체 구조 타입 정의
interface Team {
  teamId: string; // 팀 ID
  updatedAt: string; // 업데이트 일자
  createdAt: string; // 생성 일자
  image: string; // 팀 이미지
  name: string; // 팀 이름
  id: number; // 팀 ID
  members: TeamMember[]; // 멤버 배열 (TeamMember 타입 사용)
  taskLists: TaskList[]; // 할 일 리스트 배열 (TaskList 타입 사용)
}

export type { TeamMember, TaskList, Team };
