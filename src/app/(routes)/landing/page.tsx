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
      <div className="relative w-full h-[1080px] mb-8 overflow-hidden md:h-[940px]">
        <div className="absolute inset-0 w-full h-full">
          <Image
            src={LandingImage1}
            alt="랜딩 페이지 이미지"
            layout="fill"
            objectFit="cover"
            quality={100}
          />
        </div>
        <div className="absolute inset-x-0 top-[144px] transform -translate-y-1/2 text-center md:top-[160px]">
          <div className="flex items-center justify-center mb-5 md:mb-2">
            <h1 className="text-[48px] leading-[58px] md:text-4xl">
              함께 만들어가는 투두 리스트
            </h1>
            <div className="ml-2">
              <Image src={RepairIcon} alt="Repair 아이콘" width={56} height={56} 
              className="md:w-[48px] md:h-[48px]"/>
            </div>
          </div>
          <h2
            className="bg-clip-text text-transparent text-[64px] font-semibold leading-[76px] md:text-[48px] md:leading-[58px]"
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
        className="absolute left-1/2 bottom-[120px] transform -translate-x-1/2 py-3 px-36 rounded-full bg-gradient-to-r from-[#10B981] to-[#A3E635] text-lg-semibold"
        style={{
            whiteSpace: 'nowrap',
            minWidth: 'fit-content'
        }}
        >
        지금 시작하기
        </a>
      </div>

      <div className="relative mb-20 w-[996px] h-[419px] p-[1px] rounded-[40px] mt-[60px] bg-gradient-to-r from-[#10B981] to-[#CEF57E] md:w-[696px] md:h-[354px] md:mb-6 md:mt-0">
        <div className="relative p-6 rounded-[40px] w-full h-full bg-[rgba(15,23,42,1)] md:bg-[rgba(15,23,42,1)]"
            style={{
                boxShadow: '0px 0px 12px 2px #FFFFFF40'
            }}>
            <div className="absolute left-[174px] top-[81px] md:left-[121px] md:top-[81px]">
            <Image
                src={MockupImage1}
                alt="앱 Mockup 이미지"
                width={291}
                height={338}
                className="object-cover md:w-[235px] md:h-[273px]"
            />
            </div>
            <div className="absolute flex flex-col items-start right-[181px] top-[155px] md:right-[121px] md:top-[124px]">
            <Image
                src={LandingIcon1}
                alt="아이콘 이미지"
                width={48}
                height={48}
                className="mb-4"
            />
            <p className="text-2xl-medium text-left bg-transparent md:text-2lg-medium">
                그룹으로<br />할 일을 관리해요
            </p>
            </div>
        </div>
      </div>

      <div
        className="relative p-6 rounded-[40px] mb-20 w-[996px] h-[419px] border md:w-[696px] md:h-[354px] md:mb-6"
        style={{
          background: 'var(--Background-Secondary, #1E293B)',
          border: '1px solid var(--Border-Primary, #F8FAFC1A)'
        }}
      >
        <div className="absolute right-[174px] bottom-[81px] md:right-[121px] md:bottom-[81px]">
          <Image
            src={MockupImage2}
            alt="앱 Mockup 이미지"
            width={291}
            height={338}
            className="object-cover md:w-[235px] md:h-[273px]"
          />
        </div>
        <div className="absolute flex flex-col items-start left-[181px] top-[155px] md:left-[121px] md:top-[126px]">
          <Image
            src={LandingIcon2}
            alt="아이콘 이미지"
            width={48}
            height={48}
            className="mb-4"
          />
          <p className="text-2xl-medium text-left bg-transparent md:text-2lg-medium">
            간단하게 멤버들을<br />초대해요
          </p>
        </div>
      </div>

      <div className="relative p-6 rounded-[40px] w-[996px] h-[419px] bg-slate-950 border-none md:w-[696px] md:h-[354px]">
        <div className="absolute left-[174px] bottom-[81px] md:left-[121px] md:bottom-[81px]">
          <Image
            src={MockupImage3}
            alt="앱 Mockup 이미지"
            width={291}
            height={338}
            className="object-cover md:w-[235px] md:h-[273px]"
          />
        </div>
        <div className="absolute flex flex-col items-start right-[181px] top-[155px] md:right-[132px] md:top-[112px]">
          <Image
            src={LandingIcon3}
            alt="아이콘 이미지"
            width={48}
            height={48}
            className="mb-4"
          />
          <p className="text-2xl-medium text-left bg-transparent md:text-2lg-medium">
            할 일도 간편하게<br />체크해요
          </p>
        </div>
      </div>

      <div className="relative w-full flex flex-col items-center">
        <div className="text-center mb-8 mt-[230px] md:mt-[176px]">
          <h1 className="text-4xl mb-[24px]">
            지금 바로 시작해보세요
          </h1>
          <p className="text-[24px] font-medium leading-[28px]">
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
