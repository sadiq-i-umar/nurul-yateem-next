import Button, { ButtonProps, ButtonType } from "@/components/button";
import { getGroupValuesToFieldsMap } from "@/utils/form/group-field";
import { useState } from "react";
import InputField, { InputFieldProps } from "..";
import { HookFormProps } from "../..";

export type GroupFieldProps = {
  name: string;
  inputFields: InputFieldProps[];
  actionButton: ButtonProps;
  defaultGroups?: InputFieldProps[][];
  getGroups?: (groups: InputFieldProps[][]) => void;
  hookForm?: HookFormProps;
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

      //Map group values to input fields
      const groupValuesToFieldsMap = getGroupValuesToFieldsMap(
        hookForm,
        name,
        labels,
        true
      );

      //Set form values
      groupValuesToFieldsMap.map((inputField, inputFieldIndex) =>
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
                variant={ButtonType.PAPER}
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
              />
            </div>
          </div>
        ))}
      </div>
      <div>{<Button {...actionButton} onClick={addGroup} />}</div>
    </div>
  );
};

export default GroupField;
