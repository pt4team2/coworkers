interface ITask {
    doneBy: {
      user: string;
    };
    writer: string;
    displayIndex: number;
    commentCount: number;
    deletedAt: string | null;
    recurringId: number;
    frequency: 'DAILY' | 'WEEKLY' | 'MONTHLY';
    updatedAt: string;
    doneAt: string;
    date: string;
    description: string;
    name: string;
    id: number;
  }

  