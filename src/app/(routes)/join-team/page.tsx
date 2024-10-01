export default function Page() {
  return (
    <div className="mx-auto mt-[200px] flex w-[343px] flex-col md:w-[460px] lg:w-[460px]">
      <p className="text-2xl-medium m-auto mb-6 md:mb-20 lg:mb-20 lg:text-4xl">
        팀 참여하기
      </p>
      <p className="text-lg-medium mb-3">팀 링크</p>
      <input
        className="h-44px mb-10 rounded-[12px] border border-solid border-border-primary bg-background-secondary px-[16px] py-[13.5px]"
        placeholder="팀 링크를 입력해주세요."
      ></input>
      <button className="text-lg-semibold mb-6 h-12 rounded-[12px] bg-brand-primary">
        참여하기
      </button>
      <p className="text-md-regular md:text-lg-regular lg:text-lg-regular m-auto">
        공유받은 링크를 입력해 참여할 수 있어요.
      </p>
    </div>
  );
}
