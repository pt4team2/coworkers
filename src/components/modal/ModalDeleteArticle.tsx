interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    children?: React.ReactNode;
    handleDeleteArticle: () => void;
  }
  
  const ModalDeleteArticle = ({ isOpen, onClose, handleDeleteArticle }: ModalProps) => {
    if (!isOpen) return null;
  
    return (
      <div className="relative flex flex-col justify-between gap-6 rounded-b-[0px] rounded-t-xl bg-background-secondary px-[36px] pt-8">
        <h2 className="text-lg-medium text-center text-text-primary">
          게시글을 삭제 하시겠어요?
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
            onClick={handleDeleteArticle}
          >
            삭제하기
          </button>
        </div>
      </div>
    );
  };
  
  export default ModalDeleteArticle;
  