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
      <div className="relative overflow-hidden w-full h-[640px] lg:h-[1080px] md:h-[940px]">
        <div className="absolute inset-0 w-full h-full">
          <Image
            src={LandingImage1}
            alt="랜딩 페이지 이미지"
            layout="fill"
            objectFit="cover"
            quality={100}
          />
        </div>
        <div className="absolute inset-x-0 transform -translate-y-1/2 text-center top-[115px] lg:top-[144px] md:top-[160px]">
          <div className="flex items-center justify-center mb-1 lg:mb-5 md:mb-2">
            <h1 className="text-2xl-medium lg:text-[48px] lg:leading-[58px] md:text-4xl">
              함께 만들어가는 투두 리스트
            </h1>
            <div className="lg:ml-6 md:ml-4">
              <Image src={RepairIcon} alt="Repair 아이콘" width={28} height={28} 
              className="lg:w-[56px] lg:h-[56px] md:w-[48px] md:h-[48px]"/>
            </div>
          </div>
          <h2
            className="bg-clip-text text-transparent text-3xl-semibold lg:text-[64px] lg:font-semibold lg:leading-[76px] md:text-[48px] md:leading-[58px]"
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
        href="/"
        className="absolute left-1/2 transform -translate-x-1/2 px-[143px] py-[13px] rounded-full bg-gradient-to-r from-[#10B981] to-[#A3E635] text-lg-semibold bottom-12 md:bottom-[120px] w-[343px] md:w-[373px]"
        style={{
            whiteSpace: 'nowrap',
            minWidth: 'fit-content'
        }}
        >
        지금 시작하기
        </a>
      </div>

      <div className="relative bg-gradient-to-r from-[#10B981] to-[#CEF57E] p-[1px] rounded-[40px] w-[343px] h-[467px] mb-6 lg:mb-20 lg:w-[996px] lg:h-[419px] lg:mt-[60px] md:w-[696px] md:h-[354px]">
        <div className="relative p-6 rounded-[40px] w-full h-full bg-[rgba(15,23,42,1)] md:bg-[rgba(15,23,42,1)]"
            style={{
                boxShadow: '0px 0px 12px 2px #FFFFFF40'
            }}>
            <div className="absolute left-[54px] top-[194px] lg:left-[174px] lg:top-[81px] md:left-[121px] md:top-[81px]">
            <Image
                src={MockupImage1}
                alt="앱 Mockup 이미지"
                width={235}
                height={273}
                className="object-cover lg:w-[291px] lg:h-[338px]"
            />
            </div>
            <div className="absolute flex flex-col items-start left-[54px] top-[48px] lg:left-[658px] lg:top-[155px] md:left-[456px] md:top-[124px]">
            <Image
                src={LandingIcon1}
                alt="아이콘 이미지"
                width={48}
                height={48}
                className="mb-4"
            />
            <p className="text-2lg-medium text-left bg-transparent lg:text-2xl-medium">
                그룹으로<br />할 일을 관리해요
            </p>
            </div>
        </div>
      </div>

      <div
        className="relative p-6 rounded-[40px] border w-[343px] h-[467px] mb-6 lg:mb-20 lg:w-[996px] lg:h-[419px] md:w-[696px] md:h-[354px]"
        style={{
          background: 'var(--Background-Secondary, #1E293B)',
          border: '1px solid var(--Border-Primary, #F8FAFC1A)'
        }}
      >
        <div className="absolute right-[54px] bottom-[194px] lg:right-[174px] lg:bottom-[81px] md:right-[121px] md:bottom-[81px]">
          <Image
            src={MockupImage2}
            alt="앱 Mockup 이미지"
            width={235}
            height={273}
            className="object-cover lg:w-[291px] lg:h-[338px]"
          />
        </div>
        <div className="absolute flex flex-col items-start left-[54px] top-[313px] lg:left-[181px] lg:top-[155px] md:left-[121px] md:top-[126px]">
          <Image
            src={LandingIcon2}
            alt="아이콘 이미지"
            width={48}
            height={48}
            className="mb-4"
          />
          <p className="text-2lg-medium text-left bg-transparent lg:text-2xl-medium">
            간단하게 멤버들을<br />초대해요
          </p>
        </div>
      </div>

      <div className="relative p-6 rounded-[40px] bg-slate-950 border-none w-[343px] h-[467px] mb-6 lg:mb-20 lg:w-[996px] lg:h-[419px] md:w-[696px] md:h-[354px]">
        <div className="absolute left-[54px] bottom-[193px] lg:left-[174px] lg:bottom-[81px] md:left-[121px] md:bottom-[81px]">
          <Image
            src={MockupImage3}
            alt="앱 Mockup 이미지"
            width={235}
            height={273}
            className="object-cover lg:w-[291px] lg:h-[338px]"
          />
        </div>
        <div className="absolute flex flex-col items-start left-[54px] top-[314px] lg:left-[658px] lg:top-[155px] md:left-[446px] md:top-[112px]">
          <Image
            src={LandingIcon3}
            alt="아이콘 이미지"
            width={48}
            height={48}
            className="mb-4"
          />
          <p className="text-2lg-medium text-left bg-transparent lg:text-2xl-medium">
            할 일도 간편하게<br />체크해요
          </p>
        </div>
      </div>

      <div className="relative w-full flex flex-col items-center">
        <div className="text-center mt-[123px] lg:mt-[230px] md:mt-[176px]">
          <h1 className="text-2xl-semibold mb:text-4xl mb-4 md:mb-6">
            지금 바로 시작해보세요
          </h1>
          <p className="text-lg-medium md:text-2xl-medium">
          팀원 모두와 같은 방향,
          <span className="hidden md:inline"> 같은 속도로 나아가는 가장 쉬운 방법</span>
          <span className="md:hidden"><br /> 같은 속도로 나아가는 가장 쉬운 방법</span>
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
