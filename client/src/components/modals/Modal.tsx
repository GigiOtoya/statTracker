import { useEffect, useRef } from "react";
import "./Modal.css";
interface modalProps {
  visible: boolean;
  setVisible: () => void;
}

export const Modal = ({ visible, setVisible }: modalProps) => {
  const modalRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    if (modalRef.current)
      if (visible && !modalRef.current.open) {
        modalRef.current.showModal();
      } else {
        modalRef.current.close();
      }
  }, [visible]);

  return (
    <dialog ref={modalRef} className="modal">
      <h2>SOME TITLE</h2>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam sequi unde veniam doloremque
        assumenda sapiente. Temporibus minima aut consectetur. Sunt libero consectetur iste minus
        totam vitae illum id, soluta excepturi?
      </p>
      <button className="btn-close" onClick={setVisible}>
        close
      </button>
    </dialog>
  );
};
