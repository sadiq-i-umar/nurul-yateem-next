import Image, { ImageProps } from "next/image";

export enum ButtonVariant {
  CONTAINED,
  CONTAINED_DARK,
  DELETE,
  PAPER,
}

export type ButtonProps = {
  variant: ButtonVariant;
  type?: "button" | "submit";
  icon?: ImageProps;
  text?: string;
  onClick?: () => void;
  preventDefault?: boolean;
};

const Button = ({
  variant,
  icon,
  text,
  onClick,
  type = "button",
}: ButtonProps) => {
  return (
    <button
      type={type}
      onClick={(e) => {
        if (type !== "submit") e.preventDefault();
        onClick?.();
      }}
      className={`
        flex items-center gap-2 rounded-3xl ${
          icon ? "px-4" : "px-8"
        } py-2 text-sm text-white
        ${variant === ButtonVariant.CONTAINED && "bg-primary"}
        ${variant === ButtonVariant.CONTAINED_DARK && "bg-black"}
        ${variant === ButtonVariant.DELETE && "bg-red-600"}
        ${
          variant === ButtonVariant.PAPER &&
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
