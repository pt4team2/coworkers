export type User = {
  image: string;
  nickname: string;
  id: number;
};

export type Task = {
  doneBy: {
    user: User;
  };
  writer: User;
  displayIndex: number;
  commentCount: number;
  deletedAt: string;
  recurringId: number;
  frequency: 'DAILY' | 'WEEKLY' | 'MONTHLY';
  updatedAt: string;
  doneAt: string;
  date: string;
  description: string;
  name: string;
  id: number;
};

export type TaskGroup = {
  displayIndex: number;
  groupId: number;
  updatedAt: string;
  createdAt: string;
  name: string;
  id: number;
  tasks: Task[];
};
