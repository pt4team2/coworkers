import Image from 'next/image';
import EmptyImg from '@/assets/images/img_empty.svg';
import Link from 'next/link';

export default function Page() {
  return (
    <div className="m-auto flex flex-col items-center justify-center pt-[185px] md:pt-[272px] lg:pt-[212px]">
      <Image
        width={810}
        height={255}
        className="opacity-60 w-[312px] md:w-[520px] lg:w-[810px]"
        src={EmptyImg}
        alt="무소속"
      />
      <p className="text-md-medium lg:text-xl-medium mt-10 text-center text-text-default">
        접근 권한이 없는 페이지입니다.
      </p>
    </div>
  );
}
