import Image from 'next/image';
import LogoImage from '@/assets/images/img_logo.svg';

export default function () {
  return (
    <div className="flex h-[100px] items-center justify-center">
      <div>
        <Image
          className="fill-current opacity-30"
          src={LogoImage}
          alt="배경 이미지"
        />
        <p className="text-md-medium text-center text-text-default">
          아직 할 일 목록이 없습니다.
        </p>
      </div>
    </div>
  );
}
