import { formatDistanceToNow, format } from 'date-fns';
import { ko } from 'date-fns/locale';

export default function TimeAgo({ date }: { date: Date | string | null }) {
  if (!date) {
    return <span>날짜 정보 없음</span>; // date가 null이거나 undefined일 때
  }

  const parsedDate = new Date(date);

  // 유효하지 않은 날짜 처리
  if (isNaN(parsedDate.getTime())) {
    return <span>유효하지 않은 날짜</span>;
  }

  const now = new Date();
  const differenceInDays =
    (now.getTime() - parsedDate.getTime()) / (1000 * 60 * 60 * 24);

  // 7일(1주)보다 오래되면 원래 날짜 표시, 그렇지 않으면 상대적 시간 표시
  if (differenceInDays > 7) {
    return <span>{format(parsedDate, 'yyyy년 MM월 dd일')}</span>;
  }

  return (
    <span>
      {formatDistanceToNow(parsedDate, { addSuffix: true, locale: ko })}
    </span>
  );
}
