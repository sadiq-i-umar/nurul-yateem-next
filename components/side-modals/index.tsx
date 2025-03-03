import { Close, MoreVert } from "@mui/icons-material";
import { Dialog } from "@mui/material";
import { ButtonProps } from "../button";
import Form, { FormProps } from "../form";

type SideModalProps = {
  open: boolean;
  onClose: () => void;
  title: string;
  form?: FormProps;
  buttons?: ButtonProps[];
};

const containerStyle =
  "fixed top-0 right-0 flex flex-col gap-8 overflow-y-scroll h-full p-[20px] z-10 bg-white w-full sm:w-[70%] md:w-[50%]";

const SideModal = ({ open, onClose, title, form }: SideModalProps) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <div className={containerStyle}>
        <div className="flex items-center">
          <p className="flex-grow font-bold text-lg">{title}</p>
          <div className="flex items-center gap-2">
            <MoreVert />
            <span onClick={onClose} className="cursor-pointer">
              <Close />
            </span>
          </div>
        </div>
        {form && <Form {...form} />}
      </div>
    </Dialog>
  );
};

export default SideModal;
