import Button, { ButtonProps, ButtonType } from "@/components/button";
import { useState } from "react";
import InputField, { InputFieldProps } from "..";
import { HookFormProps } from "../..";

export type GroupFieldProps = {
  name: string;
  inputFields: InputFieldProps[];
  actionButton: ButtonProps;
  defaultGroups?: InputFieldProps[][];
  getGroups?: (groups: InputFieldProps[][]) => void;
  hookForm?: Pick<
    HookFormProps,
    | "watch"
    | "getValues"
    | "reset"
    | "resetField"
    | "setValue"
    | "unregister"
    | "register"
  >;
};

const GroupField = ({
  name,
  inputFields,
  actionButton,
  defaultGroups,
  getGroups,
  hookForm,
}: GroupFieldProps) => {
  const [groups, setGroups] = useState(defaultGroups ?? []);
  const addGroup = () => {
    const updatedGroups = [...groups, [...inputFields]];
    setGroups(updatedGroups);
    getGroups?.(updatedGroups);
  };

  const removeGroup = (groupIndex: number) => {
    //Remove group
    const updatedGroups = groups.filter((group, index) => {
      if (index !== groupIndex) return group;
    });

    //Align form values with updated groups
    if (typeof hookForm?.watch?.() === "object") {
      const labels = inputFields.map((inputField) => inputField.label);
      const groupKeys = Object.keys(hookForm.watch()).map((key) => key);
      const matchedKeys: string[] = [];

      //Get form keys related to the input fields
      labels.map((label) =>
        groupKeys.map((key) => {
          if (label && key.includes(label)) {
            matchedKeys.push(key);
          }
        })
      );

      //Map group values to input field
      const groupsToInputFields = inputFields.map((inputField) => {
        return matchedKeys.map((matchedKey) => {
          if (inputField.label && matchedKey.includes(inputField.label)) {
            if (hookForm.getValues?.(matchedKey)) {
              const fieldValue = hookForm.getValues?.(matchedKey);
              hookForm.unregister?.(matchedKey);
              return fieldValue;
            }
          }
        });
      });

      //Remove undefined values
      const cleanedGroupsToInputFields = groupsToInputFields.map((inputField) =>
        inputField.filter((value) => value !== undefined)
      );

      //Set form values
      cleanedGroupsToInputFields.map((inputField, inputFieldIndex) =>
        inputField.map((group, groupIndex) => {
          hookForm.setValue?.(
            `${name}${inputFields[inputFieldIndex].label}${groupIndex}`,
            group
          );
        })
      );
    }

    //Update groups
    setGroups(updatedGroups);
  };

  return (
    <div
      className={`flex flex-col ${
        groups.length > 0 && "gap-10 border-t border-t-gray-300 pt-4"
      }`}
    >
      {groups.length > 0 && (
        <p className="text-lg font-medium mb-[-10px]">{name}</p>
      )}
      <div className="flex flex-col gap-12">
        {groups.map((groupInputFields, groupIndex) => (
          <div key={groupIndex} className="flex flex-col gap-6">
            {groupInputFields.map((groupInputField, index) => (
              <InputField
                key={index}
                name={`${name}${groupInputField.label ?? ""}${groupIndex}`}
                hookForm={hookForm}
                {...groupInputField}
              />
            ))}
            <div>
              <Button
                type={ButtonType.PAPER}
                text="Remove"
                onClick={() => {
                  //Unregister the group's fields before invoking the removeGroup function
                  groupInputFields.map((inputField) => {
                    hookForm?.unregister?.(
                      `${name}${inputField.label}${groupIndex}`
                    );
                  });
                  removeGroup(groupIndex);
                }}
              ></Button>
            </div>
          </div>
        ))}
      </div>
      <div>{<Button {...actionButton} onClick={addGroup} />}</div>
    </div>
  );
};

export default GroupField;
