import React from 'react';
import Image from 'next/image';
import MockupImage1 from '@/assets/landing/mockup_1.svg';
import MockupImage2 from '@/assets/landing/mockup_2.svg';
import MockupImage3 from '@/assets/landing/mockup_3.svg';
import LandingIcon1 from '@/assets/landing/ic_landing_1.svg';
import LandingIcon2 from '@/assets/landing/ic_landing_2.svg';
import LandingIcon3 from '@/assets/landing/ic_landing_3.svg';
import LandingImage1 from '@/assets/landing/landing_1.png';
import LandingImage2 from '@/assets/landing/landing_2.png';
import RepairIcon from '@/assets/icons/ic_repair.svg';

export default function Landing() {
  return (
    <div className="flex flex-col items-center">
      <div className="relative w-full h-[680px] mb-8 overflow-hidden">
        <div className="absolute inset-0 w-full h-full">
          <Image
            src={LandingImage1}
            alt="랜딩 페이지 이미지"
            layout="fill"
            objectFit="cover"
            quality={100}
          />
        </div>
        <div className="absolute inset-x-0 top-[20%] transform -translate-y-1/2 text-center">
          <div className="flex items-center justify-center">
            <h1 className="text-white text-4xl font-semibold leading-[57.28px]">
              함께 만들어가는 투두 리스트
            </h1>
            <div className="ml-2">
              <Image src={RepairIcon} alt="Repair 아이콘" width={56} height={56} />
            </div>
          </div>
          <h2
            className="bg-clip-text text-transparent text-6xl font-semibold leading-[76.38px]"
            style={{
              background: 'linear-gradient(90deg, #10B981 0%, #CEF57E 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            Coworkers
          </h2>
        </div>
        <a
          href=""
          className="absolute left-1/2 bottom-8 transform -translate-x-1/2 py-3 px-36 rounded-full bg-gradient-to-r from-[#10B981] to-[#A3E635] text-white text-lg font-semibold text-center"
        >
          지금 시작하기
        </a>
      </div>

      <div className="relative mb-20 w-[996px] h-[419px] p-[1px] rounded-[40px] mt-[180px]"
           style={{
             background: 'linear-gradient(90deg, #10B981 0%, #CEF57E 100%)'
           }}>
        <div className="relative p-6 rounded-[40px] w-full h-full bg-[rgba(15,23,42,1)]"
             style={{
               boxShadow: '0px 0px 12px 2px #FFFFFF40'
             }}>
          <div className="absolute left-[174px] top-[81px]">
            <Image
              src={MockupImage1}
              alt="앱 Mockup 이미지"
              width={291}
              height={338}
              className="object-cover"
            />
          </div>
          <div className="absolute flex flex-col items-start right-[181px] top-[155px]">
            <Image
              src={LandingIcon1}
              alt="아이콘 이미지"
              width={48}
              height={48}
              className="mb-4"
            />
            <p className="text-2xl-medium text-white text-left bg-transparent">
              그룹으로<br />할 일을 관리해요
            </p>
          </div>
        </div>
      </div>

      <div
        className="relative p-6 rounded-[40px] mb-20 w-[996px] h-[419px] border"
        style={{
          background: 'var(--Background-Secondary, #1E293B)',
          border: '1px solid var(--Border-Primary, #F8FAFC1A)'
        }}
      >
        <div className="absolute right-[174px] bottom-[81px]">
          <Image
            src={MockupImage2}
            alt="앱 Mockup 이미지"
            width={291}
            height={338}
            className="object-cover"
          />
        </div>
        <div className="absolute flex flex-col items-start left-[181px] top-[155px]">
          <Image
            src={LandingIcon2}
            alt="아이콘 이미지"
            width={48}
            height={48}
            className="mb-4"
          />
          <p className="text-2xl-medium text-white text-left bg-transparent">
            간단하게 멤버들을<br />초대해요
          </p>
        </div>
      </div>

      <div className="relative p-6 rounded-[40px] mb-20 w-[996px] h-[419px] bg-slate-950 border-none">
        <div className="absolute left-[174px] bottom-[81px]">
          <Image
            src={MockupImage3}
            alt="앱 Mockup 이미지"
            width={291}
            height={338}
            className="object-cover"
          />
        </div>
        <div className="absolute flex flex-col items-start right-[181px] top-[155px]">
          <Image
            src={LandingIcon3}
            alt="아이콘 이미지"
            width={48}
            height={48}
            className="mb-4"
          />
          <p className="text-2xl-medium text-white text-left bg-transparent">
            할 일도 간편하게<br />체크해요
          </p>
        </div>
      </div>

      <div className="relative w-full flex flex-col items-center mb-20">
        <div className="text-center mb-8">
          <h1 className="text-white text-4xl">
            지금 바로 시작해보세요
          </h1>
          <p className="text-white text-2xl">
            팀원 모두와 같은 방향, 같은 속도로 나아가는 가장 쉬운 방법
          </p>
        </div>
        <div className="relative w-full h-[400px] overflow-hidden">
          <Image
            src={LandingImage2}
            alt="랜딩 페이지 이미지2"
            layout="fill"
            objectFit="cover"
            quality={100}
          />
        </div>
      </div>
    </div>
  );
}
