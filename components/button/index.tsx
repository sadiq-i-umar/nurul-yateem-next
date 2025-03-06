import Image, { ImageProps } from "next/image";

export enum ButtonType {
  CONTAINED,
  CONTAINED_DARK,
  DELETE,
  PAPER,
}

export type ButtonProps = {
  type: ButtonType;
  icon?: ImageProps;
  text?: string;
  onClick?: () => void;
};

const Button = ({ type, icon, text, onClick }: ButtonProps) => {
  return (
    <button
      onClick={(e) => {
        e.preventDefault();
        onClick?.();
      }}
      className={`
        flex items-center gap-2 rounded-3xl ${
          icon ? "px-4" : "px-8"
        } py-2 text-sm text-white
        ${type === ButtonType.CONTAINED && "bg-primary"}
        ${type === ButtonType.CONTAINED_DARK && "bg-black"}
        ${type === ButtonType.DELETE && "bg-red-600"}
        ${
          type === ButtonType.PAPER &&
          "bg-white !text-black border-2 border-black"
        }
        `}
    >
      {icon && <Image {...icon} />}
      {text}
    </button>
  );
};

export default Button;
