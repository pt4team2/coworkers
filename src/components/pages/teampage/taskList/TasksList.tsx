import Task from './Task';
import { IGroup, TaskList } from '@/types/Group';
import { useModalStore } from '@/store/useModalStore';
import PopupOneButton from '@/components/modal/PopupOneButton';
import AddTaskListModal from '@/components/modal/AddTaskListModal';
import { ITaskList } from '@/types/Task';
import { useAddTaskListModalStore } from '@/store/useAddTaskListModalStore';

interface TaskListProps {
  taskLists: TaskList[];
  groupId: number;
}

export default function TasksList({ taskLists, groupId }: TaskListProps) {
  const { isModalOpen, openModal, closeModal } = useAddTaskListModalStore();
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between gap-2">
        <span className="text-lg-medium">할 일 목록</span>
        <span className="mr-auto text-lg text-text-default">
          {' '}
          ({taskLists.length}개)
        </span>
        <button
          onClick={() => openModal()}
          className="text-md-regular text-brand-primary"
        >
          + 새로운 목록 추가하기
        </button>
      </div>
      <div className="flex flex-col gap-4">
        {taskLists.map((tasklist: TaskList) => (
          <Task key={tasklist.id} tasklist={tasklist} />
        ))}
      </div>
      {isModalOpen && (
        <AddTaskListModal groupId={groupId} onClose={closeModal} />
      )}
    </div>
  );
}
