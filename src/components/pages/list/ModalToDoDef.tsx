import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import CloseIcon from '@/assets/icons/ic_x2.svg';
import Kebab from '@/assets/icons/ic_kebab.svg';
import CheckYellow from '@/assets/icons/ic_check_yellow.svg';
import EnterGreen from '@/assets/icons/btn_enter_green.svg';
import Enter from '@/assets/icons/btn_enter.svg';
import UnCheck from '@/assets/icons/ic_uncheck.svg';
import Check from '@/assets/icons/ic_check.svg';
import { useModalToDoDefStore } from '@/store/useModalToDoDefStore';
import AnswerCard from './AnswerCard';
import MyAnswerCard from './MyAnswerCard';
import useSessionStore from '@/store/useSessionStore';
import { authAxiosInstance } from '@/app/api/auth/axiosInstance';
import {
  useMutation,
  useQuery,
  useQueryClient,
  UseMutationResult,
  UseQueryResult,
} from '@tanstack/react-query';

interface ModalProps {
  onClose: () => void;
  isOpen: boolean;
  title?: string;
  description: string;
  onCheckboxChange: (checked: boolean) => void;
  isCompleted: boolean;
}

interface Comment {
  content: string;
  updatedAt: string;
  createdAt: string;
  id: number;
  user: {
    image: string;
    nickname: string;
    id: number;
  };
}

export default function ModalToDoDef({
  isOpen,
  onClose,
  title,
  description,
  onCheckboxChange,
  isCompleted: initialCompleted,
}: ModalProps) {
  const { closeModal: closeToDoDefModal, taskId } = useModalToDoDefStore();
  const { user } = useSessionStore();
  const queryClient = useQueryClient();
  const [text, setText] = useState<string>('');
  const [isCompleted, setIsCompleted] = useState(initialCompleted);

  useEffect(() => {
    setIsCompleted(initialCompleted);
  }, [initialCompleted]);

  // 댓글 데이터 get 요청
  const { data: comments = [], refetch }: UseQueryResult<Comment[]> = useQuery<
    Comment[]
  >({
    queryKey: ['comments', taskId],
    queryFn: async (): Promise<Comment[]> => {
      const response = await authAxiosInstance.get(`/tasks/${taskId}/comments`);
      return response.data;
    },
    enabled: !!taskId,
  });

  // 댓글 데이터 post 요청
  const { mutate: addComment }: UseMutationResult<void, unknown, string> =
    useMutation({
      mutationFn: async (newComment: string): Promise<void> => {
        await authAxiosInstance.post(`/tasks/${taskId}/comments`, {
          content: newComment,
        });
      },
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['comments', taskId] });
        setText('');
      },
    });

  const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(event.target.value);
  };

  const handleCommentSubmit = () => {
    if (text.trim()) addComment(text);
  };

  // 완료 상태 변경
  const handleToggleCompleted = () => {
    const newCompletedStatus = !isCompleted;
    setIsCompleted(newCompletedStatus);
    onCheckboxChange(newCompletedStatus);
  };

  return (
    <div className="fixed right-0 top-0 z-50 flex h-screen w-[375px] flex-col items-center border border-border-primary bg-background-secondary p-4 md:w-[435px] md:p-6 lg:w-[779px] lg:p-10">
      <button onClick={closeToDoDefModal} className="mb-2 ml-auto">
        <Image src={CloseIcon} alt="CloseIcon" width={24} height={24} />
      </button>

      {isCompleted && (
        <div className="flex h-4 w-[43px] justify-between">
          <Image src={CheckYellow} alt="체크완료" />
          <span className="text-xs-medium text-brand-tertiary">완료</span>
        </div>
      )}

      <div className="mb-4 flex w-full justify-between">
        <span
          className={`${isCompleted ? 'line-through' : ''} text-xl-bold text-text-primary`}
        >
          {title}
        </span>
        <Image src={Kebab} alt="케밥" width={24} height={24} />
      </div>

      {user ? (
        <MyAnswerCard
          user={{
            image: user.image,
            name: user.nickname,
            updatedAt: new Date(user.updatedAt),
          }}
          content={description}
        />
      ) : (
        <div>로그인된 사용자 정보가 없습니다.</div>
      )}

      <div className="fixed top-[314px]">
        <div className="mb-6 flex w-[343px] items-center justify-between gap-2 border-b border-t border-border-primary py-[13px] md:top-[408px] md:w-[383px] lg:top-[408px] lg:w-[699px]">
          <textarea
            value={text}
            onChange={handleInputChange}
            className="w-full resize-none overflow-hidden bg-background-secondary"
            placeholder="댓글을 달아주세요"
            rows={1}
          />
          <button onClick={handleCommentSubmit} disabled={!text.trim()}>
            <Image
              src={text ? EnterGreen : Enter}
              alt={text ? '입력 완료' : '입력 없음'}
              width={24}
              height={24}
            />
          </button>
        </div>

        {comments.map((comment: Comment) => (
          <AnswerCard
            key={comment.id}
            updateAt={new Date(comment.updatedAt)}
            name={comment.user.nickname}
            profileImage={comment.user.image}
            content={comment.content}
            userId={comment.user.id}
            commentId={comment.id}
            taskId={taskId}
          />
        ))}
      </div>

      <button
        onClick={handleToggleCompleted}
        className={`z-25 text-lg-semibold fixed bottom-6 right-4 h-10 rounded-[40px] shadow-xl md:bottom-5 md:right-6 lg:bottom-10 lg:right-10 ${
          isCompleted
            ? 'border-1 w-[138px] border border-brand-primary bg-background-inverse text-brand-primary'
            : 'w-[111px] bg-brand-primary text-white'
        } flex items-center justify-center space-x-2`}
      >
        <Image
          src={!isCompleted ? Check : UnCheck}
          alt={!isCompleted ? '체크' : '언체크'}
          width={16}
          height={16}
        />
        <span>{!isCompleted ? '완료하기' : '완료 취소하기'}</span>
      </button>
    </div>
  );
}
