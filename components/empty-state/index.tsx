import Image, { ImageProps } from "next/image";
import Button, { ButtonProps } from "../button";

type EmptyStateProps = {
  image: ImageProps;
  title: string;
  gap?: number;
  button?: ButtonProps;
};

const EmptyState = ({ image, title, gap, button }: EmptyStateProps) => {
  return (
    <div className={`flex flex-col gap-${gap ?? 8} items-center`}>
      <Image {...image} />
      <p className="text-base text-center text-tetiary-300">{title}</p>
      {button && <Button {...button} />}
    </div>
  );
};

export default EmptyState;
