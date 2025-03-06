import Button, { ButtonType } from "@/components/button";
import EmptyState from "@/components/empty-state";
import { icon as imageIcon } from "@/constants/icon";
import { getImage } from "@/utils";
import Image, { ImageProps } from "next/image";
import { useState } from "react";
import { HookFormProps } from "../..";

export enum FileUploadType {
  IMAGE,
  DOC,
}

export type FileUploadFieldProps = {
  fileType: FileUploadType;
  icon: ImageProps;
  text: string;
  name?: string;
  hookForm?: Pick<HookFormProps, "setValue" | "watch" | "register">;
};

const containerStyle =
  " bg-slate-100 py-12 rounded-xl border-spacing-10 flex justify-center items-center";

/*
    Border generated from https://kovart.github.io/dashed-border-generator/
    Reason for usage: CSS does not allow adjusting the gap between border dashes
*/
const dashedBorder = `url("data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' rx='12' ry='12' stroke='%23A3B7FDFF' stroke-width='4' stroke-dasharray='6%2c 14' stroke-dashoffset='0' stroke-linecap='square'/%3e%3c/svg%3e")`;

const FileUploadField = ({
  fileType,
  icon,
  text,
  name,
  hookForm,
}: FileUploadFieldProps) => {
  const _name = name ?? "";
  const value = hookForm?.watch?.(_name);
  const isFileListValue = value instanceof FileList;
  const isImageType = fileType === FileUploadType.IMAGE;
  const [imagePreview, setImagePreview] = useState<string>();

  const simulateInputClick = () => document.getElementById(_name)?.click();

  const getContainerStyle = () => {
    if (isImageType && !isFileListValue) {
      return {
        backgroundImage: value
          ? `url(${typeof value !== "string" ? imagePreview : value})`
          : dashedBorder,
        backgroundSize: value ? "100% 100%" : "auto",
        ...(value && { border: "1px solid grey" }),
      };
    } else {
      return { backgroundImage: dashedBorder };
    }
  };

  const handleFileDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (e.dataTransfer.files.length > 0) {
      setFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileSelection = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  const setFile = (file: File) => {
    if (file) {
      hookForm?.setValue?.(_name, file);
      if (isImageType) {
        getImage(
          file,
          (image) => typeof image === "string" && setImagePreview(image)
        );
      }
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <div
        className={containerStyle}
        style={{ ...getContainerStyle(), height: 200 }}
        onDragOver={(e) => e.preventDefault()}
        onDrop={handleFileDrop}
        onClick={() => (!value || isFileListValue ? simulateInputClick() : {})}
      >
        <div>
          <input
            id={name}
            type="file"
            {...hookForm?.register(_name, {
              onChange: handleFileSelection,
            })}
            hidden
          />
          {value && !isFileListValue ? (
            isImageType ? (
              <Button
                type={ButtonType.PAPER}
                text="Upload cover image"
                onClick={() => simulateInputClick()}
              />
            ) : (
              <EmptyState image={icon} title={text} gap={4} />
            )
          ) : (
            <EmptyState image={icon} title={text} gap={4} />
          )}
        </div>
      </div>
      {value && !isFileListValue && !isImageType && (
        <div className="flex items-center">
          <p className="flex-grow">
            {typeof value === "string" ? value : value.name}
          </p>
          <div className="cursor-pointer">
            <Image
              {...imageIcon.trash}
              onClick={() => {
                hookForm?.setValue?.(_name, undefined); // resetField from hookForm is not working here. That is why setValue is used to explicitly clear the field i.e. by setting the value of the field to undefined
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default FileUploadField;
