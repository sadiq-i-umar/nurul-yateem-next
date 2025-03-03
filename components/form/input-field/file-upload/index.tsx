import Button, { ButtonType } from "@/components/button";
import EmptyState from "@/components/empty-state";
import { getImage } from "@/utils";
import { ImageProps } from "next/image";
import { useState } from "react";
import { HookFormProps } from "../..";

export enum FileUploadType {
  IMAGE,
  DOC,
}

export type FileUploadFieldProps = {
  fileType: FileUploadType;
  icon: ImageProps;
  name: string;
  text: string;
  value?: string | File;
  hookForm?: HookFormProps;
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
  value,
  name,
  hookForm,
}: FileUploadFieldProps) => {
  const isImageType = fileType === FileUploadType.IMAGE;
  const [imagePreview, setImagePreview] = useState<string>();

  const simulateInputClick = () =>
    document.getElementById("fileInput")?.click();

  const getContainerStyle = () => {
    if (isImageType) {
      return {
        backgroundImage: value
          ? `url(${value instanceof File ? imagePreview : value})`
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
      hookForm?.setValue(name, file);
      if (isImageType) {
        getImage(
          file,
          (image) => typeof image === "string" && setImagePreview(image)
        );
      }
    }
  };

  return (
    <>
      <div
        className={containerStyle}
        style={{ ...getContainerStyle(), height: 200 }}
        onDragOver={(e) => e.preventDefault()}
        onDrop={handleFileDrop}
        onClick={() => (!value && isImageType ? simulateInputClick() : {})}
      >
        <div>
          <input
            id="fileInput"
            type="file"
            onChange={handleFileSelection}
            hidden
          />
          {value ? (
            isImageType && (
              <Button
                type={ButtonType.PAPER}
                text="Upload cover image"
                onClick={() => simulateInputClick()}
              />
            )
          ) : (
            <EmptyState image={icon} title={text} gap={4} />
          )}
        </div>
      </div>
    </>
  );
};

export default FileUploadField;
