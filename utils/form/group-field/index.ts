import { HookFormProps } from "@/components/form";

export const getGroupValuesToFieldsMap = (
  hookForm: HookFormProps,
  groupLabel: string,
  fieldLabels: (string | undefined)[],
  isRemoveGroup?: boolean
) => {
  const labels = fieldLabels.map((fieldLabel) => `${groupLabel}${fieldLabel}`);
  const groupKeys = Object.keys(hookForm.getValues()).map((key) => key);
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
  const groupsToInputFields = labels.map((label) => {
    return matchedKeys.map((matchedKey) => {
      if (label && matchedKey.includes(label)) {
        if (hookForm.getValues?.(matchedKey)) {
          const fieldValue = hookForm.getValues?.(matchedKey);
          if (isRemoveGroup) {
            hookForm.unregister?.(matchedKey);
          }
          return fieldValue;
        }
      }
    });
  });

  //Remove undefined values
  const cleanedGroupsToInputFields = groupsToInputFields.map((inputField) =>
    inputField.filter((value) => value !== undefined)
  );

  return cleanedGroupsToInputFields;
};

export function getGroupPayload(
  hookForm: HookFormProps,
  groupLabel: string,
  fieldLabels: string[]
) {
  const groupValuesToFieldsMap = getGroupValuesToFieldsMap(
    hookForm,
    groupLabel,
    fieldLabels
  );

  const rowCount = groupValuesToFieldsMap.reduce(
    (max, row) => Math.max(max, row.length),
    0
  );
  return Array.from({ length: rowCount }, (_, index) => {
    const obj: Record<string, any> = {};
    fieldLabels.forEach((field, fieldIndex) => {
      obj[field] = groupValuesToFieldsMap[fieldIndex]?.[index];
    });
    return obj;
  });
}
