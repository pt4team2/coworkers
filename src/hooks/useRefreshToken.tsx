import { useEffect, useRef } from 'react';
import { useSession } from 'next-auth/react';

export default function useRefreshToken() {
  const { data: session, update } = useSession();

  const interval = useRef<ReturnType<typeof setInterval> | undefined>(
    undefined,
  );

  useEffect(() => {
    // 이미 interval이 설정되어 있으면 해제
    if (interval.current) {
      clearInterval(interval.current);
    }

    // 토큰 만료 여부 체크
    const watchAndUpdateIfExpire = async () => {
      if (session) {
        const currentTime = Math.floor(new Date().getTime() / 1000); // Unix 타임스탬프
        const accessTokenExpires = Math.floor(
          session.accessTokenExpires / 1000,
        );
        const timeRemaining = accessTokenExpires - 60 * 10 - currentTime; // 만료 10분 전까지 남은 시간 계산

        // 만료 10분 전 토큰 갱신
        if (timeRemaining === 0 || timeRemaining === -1) {
          console.log('토큰 만료 10분 전 갱신');

          try {
            update();
          } catch (error) {
            console.log('토큰 업데이트 중 에러', error);
          }
        }
      }
    };

    // 5분마다 토큰 만료 여부 체크
    interval.current = setInterval(watchAndUpdateIfExpire, 60 * 5 * 1000);

    // 컴포넌트 언마운트 시 interval 해제
    return () => {
      if (interval.current) {
        clearInterval(interval.current);
      }
    };
  }, [session, update]);

  return null;
}
