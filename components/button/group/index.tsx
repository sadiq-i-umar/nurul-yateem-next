import Button, { ButtonProps } from "..";

export type ButtonGroupProps = {
  buttons: ButtonProps[];
  position?: "start" | "center" | "end";
};

const ButtonGroup = ({ buttons, position }: ButtonGroupProps) => {
  return (
    <div
      className={`flex items-center ${
        position === "start" && "justify-start"
      } ${position === "center" && "justify-center"} ${
        position === "end" && "justify-end"
      } gap-4`}
    >
      {buttons?.map((button, index) => (
        <Button key={index} {...button} />
      ))}
    </div>
  );
};

export default ButtonGroup;
