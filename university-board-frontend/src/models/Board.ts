import { Membership } from "./Membership";

export interface BoardType {
  uuid: string;
  name: string;
}

export interface Board {
  name: string;
  description: string;
  startDate: string;
  endDate: string;
  status: BoardStatus;
  boardType: BoardType;
  uuid: string;
  memberships: Membership[];
}

export enum BoardStatus {
  PENDING = "Pending",
  ACTIVE = "Active",
  CLOSED = "Closed",
  EXPIRED = "Expired",
}

export default BoardStatus;
