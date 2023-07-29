"use client";
import { GrClose } from "react-icons/gr";

type Props = { isOpen: boolean; onClose: () => void; children: JSX.Element };

function Modal({ isOpen, onClose, children }: Props) {
  if (!isOpen) return;
  return (
    <div className="fixed left-0 top-0 z-30 flex h-screen w-full justify-center bg-black/70 text-creamywhite">
      <div className="mt-24 h-fit w-fit rounded-md bg-lightjetblack p-2 font-bold">
        <button
          className="my-3 flex items-center justify-center gap-2"
          onClick={onClose}
        >
          <GrClose size={"24px"} className="text-creamywhite" />
          <p>Close</p>
        </button>

        {children}
      </div>
    </div>
  );
}

export default Modal;
