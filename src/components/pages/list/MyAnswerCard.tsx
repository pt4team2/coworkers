import { useState } from 'react';
import CardProfile from './CardProfile';

interface MyAnswerCardProps {
  user: { image: string | null; name: string; updatedAt: Date } | null;
  content: string;
}

export default function MyAnswerCard({ user, content }: MyAnswerCardProps) {
  if (!user) {
    return <div>사용자 정보가 없습니다.</div>;
  }
  return (
    <div className="w-[343px] md:w-[387px] lg:w-[699px]">
      <CardProfile
        updateAt={user.updatedAt}
        profileImage={user.image ?? ''}
        name={user.name}
      />
      <p className="text-md-regular mt-4 w-full text-text-primary">{content}</p>
    </div>
  );
}
