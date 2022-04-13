import { ReactNode } from "react";
import { ModalView } from "./view";

export type ModalProps = {
  open: boolean;
  onClose: () => void;
  children: ReactNode;
  title: string;
};

export const Modal = (props: ModalProps) => {
  return <ModalView {...props} />;
};
