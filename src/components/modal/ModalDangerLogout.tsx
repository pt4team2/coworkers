interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children?: React.ReactNode;
  handleSignOut: () => void;
}

const ModalDangerLogout = ({ isOpen, onClose, handleSignOut }: ModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="relative flex flex-col justify-between gap-6 rounded-b-[0px] rounded-t-xl bg-background-secondary px-[36px] pt-8">
      <h2 className="text-lg-medium text-center text-text-primary">
        로그아웃 하시겠어요?
      </h2>
      <div className="flex h-12 w-full justify-between gap-2">
        <button
          className="px-auto py-auto text-lg-semibold w-[136px] rounded-xl border border-text-secondary bg-background-inverse text-text-default"
          onClick={onClose}
        >
          닫기
        </button>
        <button
          className="px-auto py-auto text-lg-semibold w-[136px] rounded-xl bg-red-500 text-text-inverse"
          onClick={handleSignOut}
        >
          로그아웃
        </button>

        {/* 배경컬러가 레드인 것이 없어 수기로 작성 */}
      </div>
    </div>
  );
};

export default ModalDangerLogout;
