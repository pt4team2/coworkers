'use client';

import { useForm } from 'react-hook-form';
import { useState } from 'react';
import Image from 'next/image';
import XIcon from '@/assets/icons/ic_x.svg';
import PlusIcon from '@/assets/icons/ic_upload.svg';

interface FormValues {
  title: string;
  content: string;
  image: FileList | null;
}

const AddBoardPage = () => {
  const { register, handleSubmit, formState: { errors }, setValue } = useForm<FormValues>();
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const onSubmit = (data: FormValues) => {
    console.log('제출 데이터:', data);
    // 데이터 처리 로직 추가 필요
  };

  // 이미지 선택 시 미리보기
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImagePreview(URL.createObjectURL(file));
      setValue('image', e.target.files);
    }
  };

  const removeImage = () => {
    setImagePreview(null);
    setValue('image', null);
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="w-[375px] px-4 py-10">
        <h1 className="text-2lg-medium text-left">게시글 쓰기</h1>

        <div className="border-t border-gray-800 my-6"></div>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-8">
            <label className="block text-md-medium mb-4">
              <span className="text-brand-tertiary mr-[6px]">*</span>제목
            </label>
            <input
              type="text"
              placeholder="제목을 입력해주세요."
              className="w-full h-12 p-4 text-md-medium-alt rounded-[12px] border-[1px] border-[#F8FAFC1A] bg-background-secondary focus:outline-none"
              {...register('title', { required: '제목을 입력해주세요.' })}
            />
            {errors.title && <p className="text-red-500 text-md-medium-alt mt-1">{errors.title.message}</p>}
          </div>

          <div className="mb-8">
            <label className="block text-md-medium mb-4">
              <span className="text-brand-tertiary mr-[6px]">*</span>내용
            </label>
            <textarea
              placeholder="내용을 입력해주세요."
              className="w-full h-60 px-4 py-2 text-md-medium-alt rounded-[12px] border-[1px] border-[#F8FAFC1A] bg-background-secondary focus:outline-none resize-none"
              {...register('content', { required: '내용을 입력해주세요.' })}
            />
            {errors.content && <p className="text-red-500 text-md-medium-alt mt-1">{errors.content.message}</p>}
          </div>

          <div className="mb-10">
            <label className="block text-md-medium mb-4">이미지</label>
            <div className="w-40 h-40 border-[1px] border-[#F8FAFC1A] rounded-[12px] flex items-center justify-center relative bg-background-secondary">
              {!imagePreview ? (
                <label className="cursor-pointer">
                  <input
                    type="file"
                    className="hidden"
                    {...register('image')}
                    onChange={handleImageChange}
                  />
                  <div className="flex flex-col items-center">
                    <Image src={PlusIcon} alt="이미지 등록" className="w-6 h-6 mb-3"/>
                    <span className="text-gray-400 text-md-regular">이미지 등록</span>
                  </div>
                </label>
              ) : (
                <div className="relative w-full h-full">
                  <img
                    src={imagePreview}
                    alt="미리보기"
                    className="w-full h-full object-cover rounded-[12px] opacity-50"
                  />
                  <button
                    type="button"
                    onClick={removeImage}
                    className="absolute top-[50%] left-[50%] transform -translate-x-1/2 -translate-y-1/2"
                  >
                    <Image src={XIcon} alt="이미지 삭제" className="w-10 h-10" />
                  </button>
                </div>
              )}
            </div>
          </div>

          <button
            type="submit"
            className="w-full h-12 py-[6px] text-md-semibold rounded-[12px] bg-brand-primary hover:bg-interaction-hover transition-colors"
          >
            등록
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddBoardPage;
