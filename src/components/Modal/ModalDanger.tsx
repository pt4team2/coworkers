import Image from 'next/image';
import DangerIcon from '@/assets/icons/ic_alert.svg';
interface ModalProps {
  isOpen?: boolean;
  onClose?: () => void;
  onDelete: () => void;

  children?: React.ReactNode;
}

const ModalDanger = ({ isOpen, onClose, onDelete }: ModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="mx-auto mt-6 flex h-[173px] w-[280px] flex-col items-center justify-between">
      <div className="flex h-[101px] flex-col items-center justify-between">
        <div>
          <Image src={DangerIcon} alt="DangerIcon" width={24} height={24} />
        </div>
        <div className="flex h-[61px] w-[239px] flex-col justify-between">
          <div className="text-lg-medium text-center">
            회원 탈퇴를 진행하시겠어요?
          </div>
          <div className="text-md-medium break-keep text-center text-text-secondary">
            그룹장으로 있는 그룹은 자동으로 삭제되고, 모든 그룹에서 나가집니다.
          </div>
        </div>
      </div>
      <div className="text-lg-semibold flex h-12 w-full justify-between">
        <button
          className="px-auto w-[136px] rounded-xl border border-text-secondary bg-background-inverse py-3 text-text-default"
          onClick={onClose}
        >
          닫기
        </button>
        <button
          className="px-auto py-auto w-[136px] rounded-xl bg-red-500 text-text-inverse"
          onClick={onDelete}
        >
          회원 탈퇴
        </button>
      </div>
    </div>
  );
};

export default ModalDanger;
