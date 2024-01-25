import { ReactNode, createContext, useEffect, useRef } from "react";
import "./Modal.css";

interface DialogModalProps {
  visible: boolean;
  onClose: () => void;
  children: ReactNode;
}

type DialogModalContextType = {
  modalRef: React.Ref<HTMLDialogElement>;
  handleOnClose: () => void;
};

export const DialogModalContext = createContext<DialogModalContextType | null>(null);

export const DialogModal = ({ visible, onClose, children }: DialogModalProps) => {
  const modalRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const m = modalRef.current;
    visible ? m?.showModal() : m?.close();
  }, [visible]);

  const handleOnClose = () => {
    onClose();
  };

  return (
    <DialogModalContext.Provider value={{ modalRef, handleOnClose }}>
      <dialog className="modal" ref={modalRef} onClose={handleOnClose}>
        {children}
      </dialog>
    </DialogModalContext.Provider>
  );
};
