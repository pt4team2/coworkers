import { useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ToastProps } from '@/types/toast';
import successIcon from '@/assets/icons/success.svg';
import errorIcon from '@/assets/icons/error.svg';
import infoIcon from '@/assets/icons/info.svg';
import closeIcon from '@/assets/icons/close.svg';
import closeIconWhite from '@/assets/icons/close_white.svg';

interface ToastComponentProps extends ToastProps {
  closeToast: () => void;
}

export default function Toast({
  message,
  type,
  duration = 3000,
  closeToast,
}: ToastComponentProps) {
  useEffect(() => {
    const timer = setTimeout(() => {
      closeToast();
    }, duration);

    return () => {
      clearTimeout(timer);
      console.log('toast 출력');
    };
  }, [duration, closeToast]);

  return (
    <div
      id="toast-message"
      className={`z-300 fixed left-1/2 top-24 flex w-80 -translate-x-1/2 transform items-center justify-between rounded-lg p-4 ${
        type === 'success'
          ? 'bg-background-inverse'
          : type === 'error'
            ? 'bg-point-rose'
            : 'bg-point-yellow'
      }`}
    >
      <div className="flex items-center gap-2">
        <Image
          src={
            type === 'success'
              ? successIcon
              : type === 'error'
                ? errorIcon
                : infoIcon
          }
          width={type === 'error' ? 14 : 16}
          height={type === 'error' ? 14 : 16}
          alt="토스트 아이콘"
        />
        <span
          className={`text-lg-medium absolute left-9 top-4 ${type === 'error' ? 'text-text-primary' : 'text-background-secondary'}`}
        >
          {message}
        </span>
      </div>
      <div>
        <Link href="#" onClick={closeToast}>
          <Image
            src={type === 'error' ? closeIconWhite : closeIcon}
            width={18}
            height={18}
            alt="닫기 아이콘"
          />
        </Link>
      </div>
    </div>
  );
}
