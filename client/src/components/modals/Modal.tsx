import { ReactNode, useEffect, useRef } from "react";
import "./Modal.css";
interface modalProps {
  visible: boolean;
  setVisible: (value: boolean) => void;
  children?: ReactNode;
}

export const Modal = ({ visible, setVisible, children }: modalProps) => {
  const modalRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    if (modalRef.current)
      if (visible && !modalRef.current.open) {
        modalRef.current.showModal();
      } else {
        modalRef.current.close();
      }
  }, [visible]);

  const handleCloseModal = (value: boolean) => {
    setVisible(value);
  };

  return (
    <dialog ref={modalRef} className="modal" onClose={() => setVisible(false)}>
      {children}
      <button className="btn-close" onClick={() => setVisible(false)}>
        Cancel
      </button>
    </dialog>
  );
};
