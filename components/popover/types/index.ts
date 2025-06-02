export type PopoverOption = {
  name: string;
  onClick: (arg?: string) => void;
};

export type PopoverProps = {
  triggerButton: React.ReactNode;
  getTriggerButtonClick?: () => void;
  moreOptions?: PopoverOption[];
  dataToReturnOnItemClick?: string | number;
  addItemsSelectContent?: React.ReactElement;
  onCloseAction?: () => void;
  onResetClick?: () => void;
  onFilterClick?: () => void;
};

export type MoreOptionsPopoverContentProps = {
  options?: PopoverOption[];
  itemClick: () => void;
  dataToReturnOnItemClick?: string | number;
};
