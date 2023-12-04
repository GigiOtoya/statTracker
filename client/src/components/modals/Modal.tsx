import { ReactNode, createContext, useEffect, useRef } from "react";
import "./Modal.css";
interface modalProps {
  visible: boolean;
  setVisible: (value: boolean) => void;
  children?: ReactNode;
}

interface modalContextType {
  closeModal: () => void;
}

export const ModalContext = createContext<modalContextType | null>(null);

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

  const closeModal = () => {
    setVisible(false);
  };

  return (
    <ModalContext.Provider value={{ closeModal }}>
      <dialog ref={modalRef} className="modal" onClose={closeModal}>
        {children}
      </dialog>
    </ModalContext.Provider>
  );
};
