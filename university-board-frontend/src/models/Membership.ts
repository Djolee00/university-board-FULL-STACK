import { Employee } from "./Employee";

export interface Membership {
  commencementDate: string;
  status: string;
  employee: Employee;
}
