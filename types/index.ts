import { SxProps, Theme } from "@mui/material";

export type Dict = Record<string, string>;
export type DictOf<T> = Record<string, T>;

export type SxPropsType = {
    sx?: SxProps<Theme>;
  };

export type Orphan = {
  id: number,
  guardians_id: number,
  profile_photo: string,
  gender: string,
  first_name: string,
  last_name: string,
  state_of_origin: string,
  local_government: string,
  date_of_birth: string,
  in_school: string,
  school_name: string,
  school_address: string,
  school_contact_person: string,
  phone_number_of_contact_person: string,
  account_status: string,
  unique_code: string,
  class: string,
  created_at: string,
  updated_at: string
}