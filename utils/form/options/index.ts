import { Orphan } from "@/components/orphan-list/api/types";

export const getOptions = (options: string[]) => {
  return options.map((option) => ({ label: option, value: option }));
};

export const getOrphansMultiSelectOptions = (orphans?: Orphan[]) => {
  return orphans?.map((orphan) => ({
    label: `${orphan.user?.profile?.firstName} ${orphan.user?.profile?.lastName}`,
    value: orphan.id,
  }));
};
