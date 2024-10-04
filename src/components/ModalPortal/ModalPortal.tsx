import { ReactNode, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

function ModalPortal({
  onClose,
  children,
}: {
  onClose: () => void | undefined;
  children: ReactNode;
}) {
  //modal div에 렌더링 되도록 함
  const selectedElement = document.getElementById('_modal');
  const [mounted, setMounted] = useState<boolean>(false);

  useEffect(() => {
    setMounted(true);
    document.body.style.overflow = 'hidden';

    return () => {
      setMounted(false);
      document.body.style.overflow = 'auto';
    };
  }, []);

  if (typeof window === 'undefined') return <></>;
  if (!mounted) return <></>;

  const handleModalClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  return createPortal(
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
      onClick={handleModalClick}
    >
      {children}
    </div>,
    selectedElement as HTMLElement,
  );
}

export default ModalPortal;
