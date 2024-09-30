import Task from './Task';
import { IGroup, TaskList } from '@/types/Group';
import { useModalStore } from '@/store/useModalStore';
import ModalWrapper from '@/components/modal/ModalWrapper';
import PopupOneButton from '@/components/modal/PopupOneButton';
import AddTaskListModal from '@/components/modal/AddTaskListModal';
import { ITaskList } from '@/types/Task';

interface TaskListProps {
  taskLists: TaskList[];
}

export default function TasksList({ taskLists }: TaskListProps) {
  const { isModalOpen, openModal, closeModal } = useModalStore();
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
        <ModalWrapper>
          <AddTaskListModal onClose={closeModal} />
        </ModalWrapper>
      </div>

      <div className="flex flex-col gap-4">
        {taskLists.map((tasklist: TaskList) => (
          <Task key={tasklist.id} tasklist={tasklist} />
        ))}
      </div>
    </div>
  );
}
