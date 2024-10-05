import ImageInput from '@/components/pages/teamcreate/ImageInput';
import IcExit from '@/assets/icons/ic_secession.svg';
import Image from 'next/image';

export default function Page() {
  return (
    <div className="lg: m-auto max-w-[792px]">
      <p className="text-2l-bold md:text-xl-bold lg:text-xl-bold mb-6 mt-6 md:mt-6 lg:mt-10">
        계정 설정
      </p>
      {/* <ImageInput imageUrl={imageUrl} setImageUrl={setImageUrl}/> */}
      <div className="mb-6">
        <label className="text-lg-medium mb-3 block">이름</label>
        <input className="text-md-regular md:text-lg-regular lg:text-lg-regular w-full rounded-[12px] border border-solid border-border-primary bg-background-secondary px-[16px] py-[13.5px] focus:border-status-brand focus:outline-none focus:ring-status-brand md:py-[14.5px] lg:py-[14.5px]"></input>
      </div>
      <div className="mb-6">
        <label className="text-lg-medium mb-3 block">이메일</label>
        <input
          className="text-md-regular md:text-lg-regular lg:text-lg-regular w-full cursor-not-allowed rounded-[12px] border border-solid border-border-primary bg-background-tertiary px-[16px] py-[13.5px] text-text-disabled md:py-[14.5px] lg:py-[14.5px]"
          disabled
        />
      </div>
      <div className="mb-6">
        <label className="text-lg-medium mb-3 block">비밀번호</label>
        <div className="relative">
          <input
            className="text-md-regular md:text-lg-regular lg:text-lg-regular w-full cursor-not-allowed rounded-[12px] border border-solid border-border-primary bg-background-tertiary px-[16px] py-[13.5px] text-text-disabled md:py-[14.5px] lg:py-[14.5px]"
            disabled
          />
          <button className="text-sm-semibold absolute right-4 top-[6px] h-8 w-[74px] rounded-[12px] bg-brand-primary px-[12.5px] py-[6px] md:top-2 lg:top-2">
            변경하기
          </button>
        </div>
      </div>
      <div className="flex flex-row items-center gap-2">
        <Image width={24} height={24} src={IcExit} alt="탈퇴 아이콘" />
        <button>
          <span className="text-lg-medium text-status-danger">
            회원 탈퇴하기
          </span>
        </button>
      </div>
    </div>
  );
}
