import { useEffect } from "react";

interface Props {
  ref: React.RefObject<HTMLElement>;
  onClick: () => void;
}

export const useDetectOutside = ({ ref, onClick }: Props) => {
  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        onClick();
      }
    };

    document.addEventListener("click", handleOutsideClick);

    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, [ref, onClick]);
};
