import { ImageProps } from "next/image";

const iconBasePath = "/icons/";

type IconKey = "plus" | "picture" | "calendar" | "doc" | "trash";

export const icon: Record<IconKey, ImageProps> = {
  plus: {
    src: `${iconBasePath}plus.svg`,
    alt: "plus-icon",
    height: 20,
    width: 20,
  },
  picture: {
    src: `${iconBasePath}picture.svg`,
    alt: "image-upload-icon",
    height: 36,
    width: 36,
  },
  calendar: {
    src: `${iconBasePath}`,
    alt: "calendar-icon",
    height: 20,
    width: 20,
  },
  doc: {
    src: `${iconBasePath}doc.svg`,
    alt: "doc-icon",
    width: 36,
    height: 36,
  },
  trash: {
    src: `${iconBasePath}trash.svg`,
    alt: "trash-icon",
    width: 36,
    height: 36,
  },
};
