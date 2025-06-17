"use client";
import Link from "next/link";
import Form, { FormProps } from "../../form";

type ReusableAuthProps = {
  title: string;
  subtitle: string;
  form: FormProps;
  centerImage: string;
  infoBottomText: {
    initial: string;
    middle: string;
    end: string;
    highlight: LinkPosition;
  };
  formBottomText: { plainText: string; linkText: string; link: string };
};

const LINK_POSITIONS = ["initial", "middle", "end"] as const;
type LinkPosition = (typeof LINK_POSITIONS)[number];

const ReusableAuth = ({
  title,
  subtitle,
  form,
  centerImage,
  infoBottomText,
  formBottomText,
}: ReusableAuthProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2">
      <div className="flex flex-col gap-12 p-10 bg-[#F5F5F5] md:min-h-screen">
        <Link href="/">
          <img {...{ src: "/nurul_yateem_logo.png", width: 154, height: 70 }} />
        </Link>
        <div className="hidden md:flex justify-center">
          <img
            {...{
              src: centerImage,
              width: 350,
              height: 720,
            }}
          />
        </div>
        <p className="hidden md:inline text-center">
          {LINK_POSITIONS.map((position) => (
            <span
              key={position}
              className={
                infoBottomText.highlight === position ? "text-primary" : ""
              }
            >
              {infoBottomText[position]}
            </span>
          ))}
        </p>
      </div>
      <div className="py-16 px-16">
        <div className="mb-10 flex flex-col gap-2">
          <h1 className="font-semibold text-2xl">{title}</h1>
          <p className="text-base text-gray-500">{subtitle}</p>
        </div>
        <Form {...form} />
        <p className="text-center mt-4 text-sm">
          {formBottomText.plainText}{" "}
          <a className="text-primary" href={formBottomText.link}>
            {formBottomText.linkText}
          </a>
        </p>
      </div>
    </div>
  );
};

export default ReusableAuth;
