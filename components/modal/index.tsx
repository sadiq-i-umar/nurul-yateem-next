import { Close } from "@mui/icons-material";
import { Dialog } from "@mui/material";
import Image, { ImageProps } from "next/image";
import Button, { ButtonProps } from "../button";
import Form, { FormProps } from "../form";

type ModalProps = {
  open: boolean;
  onClose: () => void;
  sideModal?: boolean;
  title?: string;
  form?: FormProps;
  centerContent?: CenterContent;
};

type CenterContent = {
  image: ImageProps;
  title: string;
  subtitle: string;
  button: ButtonProps;
};

const defaultStyle = "flex flex-col p-[40px]";

const sideModalStyle =
  "fixed top-0 right-0 flex flex-col gap-8 overflow-y-scroll h-full p-[20px] z-10 bg-white w-full sm:w-[70%] md:w-[50%]";

const Modal = ({
  open,
  onClose,
  sideModal,
  title,
  form,
  centerContent,
}: ModalProps) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <div className={sideModal ? sideModalStyle : defaultStyle}>
        <div className="flex items-center">
          <p className="flex-grow font-bold text-lg">{title}</p>
          <span onClick={onClose} className="cursor-pointer">
            <Close />
          </span>
        </div>
        {form && <Form {...form} />}
        {centerContent && (
          <div className="flex flex-col items-center gap-4 text-center">
            <Image {...centerContent.image} />
            <p className="text-primary text-xl font-bold">
              {centerContent.title}
            </p>
            <p>{centerContent.subtitle}</p>
            <Button {...centerContent.button} />
          </div>
        )}
      </div>
    </Dialog>
  );
};

export default Modal;
