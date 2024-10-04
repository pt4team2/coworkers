import Image from 'next/image';
import EmptyImg from '@/assets/images/img_empty.svg';
import Link from 'next/link';

export default function Page() {
  return (
    <div className="m-auto flex flex-col items-center justify-center pt-[185px] md:pt-[272px] lg:pt-[212px]">
      <Image
        width={810}
        height={255}
        className="w-[312px] md:w-[520px] lg:w-[810px]"
        src={EmptyImg}
        alt="무소속"
      />
      <p className="text-md-medium text-center text-text-default">
        아직 소속된 팀이 없습니다.
      </p>
      <p className="text-md-medium text-center text-text-default">
        팀을 생성하거나 팀에 참여해보세요.
      </p>
      <div className="mt-12 flex flex-col gap-2 md:mt-20 lg:mt-20">
        <Link href="/create-team">
          <button className="text-lg-semibold rounded-[12px] border border-solid border-brand-primary bg-brand-primary px-[61px] py-[15.5px] text-text-inverse">
            팀 생성하기
          </button>
        </Link>
        <Link href="/join-team">
          <button className="text-lg-semibold rounded-[12px] border border-solid border-brand-primary bg-background-primary px-[61px] py-[15.5px] text-text-inverse">
            팀 참여하기
          </button>
        </Link>
      </div>
    </div>
  );
}
