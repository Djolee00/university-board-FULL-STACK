import { Employee } from "./Employee";

export interface Membership {
  uuid: string | null;
  commencementDate: string | null;
  status: MembershipStatus | null;
  employee: Employee | null;
  employeeUuid: string | null;
}

export enum MembershipStatus {
  ACTIVE = "Active",
  MEMBER = "Member",
  PROBATION = "Probation",
}
