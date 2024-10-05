import Image from 'next/image';
import IcChecked from '@/assets/icons/checkedbox.svg';

export default function Page() {
  return (
    <div className="mt-6 lg:mt-10">
      <p className="text-xl-bold">마이 히스토리</p>

      {/* TODO: 맵돌려서 날짜별로 히스토리 카드들 돌려야함 */}
      {/* TODO: 히스토리가 없는 경우 처리 */}
      
      <p className="text-lg-medium lg:mt-6s mt-[27px] md:mt-6">date</p>
      <div className="my-8 flex h-11 w-full flex-row gap-[3.5px] rounded-[8px] bg-background-secondary px-[14px] py-[10px]">
        <Image src={IcChecked} alt="체크박스" />
        <span className="line-through">완료한 할 일 카드</span>
      </div>
    </div>
  );
}
