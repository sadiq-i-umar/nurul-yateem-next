export enum UserRole {
  Guardian = "guardian",
  Sponsor = "sponsor",
  Admin = "admin",
}

export const rolesRoutes: Record<string, string> = {
  [UserRole.Guardian]: "/dashboard/guardian/home",
  [UserRole.Sponsor]: "/dashboard/sponsor/home",
  [UserRole.Admin]: "/dashboard/admin/home",
};
