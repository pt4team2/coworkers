import Image from 'next/image';
import Kebab from '@/assets/icons/ic_kebab.svg';
import { useState, useRef, useEffect, ChangeEvent } from 'react';
import CardProfile from './CardProfile';
import useSessionStore from '@/store/useSessionStore';
import { authAxiosInstance } from '@/app/api/auth/axiosInstance';
import { useMutation, useQueryClient } from '@tanstack/react-query';

interface AnswerCardProps {
  updateAt: Date;
  name: string;
  profileImage?: string;
  content: string;
  userId: number;
  commentId: number;
  taskId: number | null;
}

export default function AnswerCard({
  updateAt,
  name,
  profileImage,
  content,
  userId,
  commentId,
  taskId,
}: AnswerCardProps) {
  const { user } = useSessionStore();
  const queryClient = useQueryClient();

  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [editedContent, setEditedContent] = useState<string>(content);
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // DELETE 요청
  const { mutate: deleteComment } = useMutation({
    mutationFn: async () => {
      await authAxiosInstance.delete(`/tasks/${taskId}/comments/${commentId}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['comments', taskId] });
    },
  });

  // PATCH 요청
  const { mutate: editComment } = useMutation({
    mutationFn: async (newContent: string) => {
      await authAxiosInstance.patch(`/tasks/${taskId}/comments/${commentId}`, {
        content: newContent,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['comments', taskId] });
      setIsEditing(false);
    },
  });

  // `textarea` 입력 변경 처리
  const handleContentChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setEditedContent(e.target.value);
  };

  // `textarea` 높이와 너비를 텍스트 길이에 맞게 조정
  useEffect(() => {
    if (textareaRef.current && canvasRef.current) {
      const canvas = canvasRef.current;
      const context = canvas.getContext('2d');

      if (context) {
        // 현재 폰트 스타일을 적용하여 텍스트 폭 계산
        const style = window.getComputedStyle(textareaRef.current);
        context.font = `${style.fontSize} ${style.fontFamily}`;
        const textWidth = context.measureText(editedContent).width;

        // 텍스트 길이에 따라 `textarea`의 `width`와 `height`를 조정
        textareaRef.current.style.width = `${Math.min(textWidth, 500)}px`; // 최대 너비 설정
        textareaRef.current.style.height = 'auto';
        textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
      }
    }
  }, [editedContent, isEditing]);

  const isUser = user?.id === userId;

  return (
    <div className="mb-4 flex w-[343px] flex-col items-end border-b border-border-primary md:w-[387px] lg:w-[699px]">
      {/* Canvas 요소는 화면에 보이지 않도록 숨김 */}
      <canvas ref={canvasRef} style={{ display: 'none' }} />

      <div
        className={`${isUser ? 'mb-2' : 'mb-4'} flex w-full justify-between`}
      >
        {isEditing ? (
          <textarea
            ref={textareaRef}
            value={editedContent}
            onChange={handleContentChange}
            rows={1}
            className="text-sm-semibold resize-none overflow-hidden bg-background-secondary"
          />
        ) : (
          <p className="text-md-regular text-text-primary">{content}</p>
        )}

        {isUser && !isEditing && (
          <button>
            <Image src={Kebab} alt="케밥" width={16} height={16} />
          </button>
        )}
      </div>

      {isUser ? (
        isEditing ? (
          <div className="flex h-8 w-[130px] justify-between">
            <button
              className="text-sm-semibold h-8 w-12 rounded-xl text-status-danger"
              onClick={() => setIsEditing(false)}
            >
              취소
            </button>
            <button
              className="text-sm-semibold border-1 h-8 w-[74px] rounded-xl border border-brand-primary text-brand-primary"
              onClick={() => editComment(editedContent)}
            >
              수정하기
            </button>
          </div>
        ) : (
          <div className="flex h-8 w-[130px] justify-between">
            <button
              className="text-sm-semibold h-8 w-12 rounded-xl text-text-default hover:text-status-danger"
              onClick={() => deleteComment()}
            >
              삭제
            </button>
            <button
              className="text-sm-semibold h-8 w-[74px] rounded-xl border-2 border-transparent text-text-default hover:border-brand-primary hover:text-brand-primary"
              onClick={() => setIsEditing(true)}
            >
              수정하기
            </button>
          </div>
        )
      ) : (
        <CardProfile
          updateAt={updateAt}
          profileImage={profileImage}
          name={name}
        />
      )}
    </div>
  );
}
