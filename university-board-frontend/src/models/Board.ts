import { Membership } from "./Membership";

export interface BoardType {
  uuid: string | null;
  name: string | null;
}

export interface Board {
  name: string | null;
  description: string | null;
  startDate: string | null;
  endDate: string | null;
  status: BoardStatus | null;
  boardType: BoardType | null;
  uuid: string | null;
  memberships: Membership[] | null;
  comments: Comment[] | null;
}

export enum BoardStatus {
  PENDING = "Pending",
  ACTIVE = "Active",
  CLOSED = "Closed",
  EXPIRED = "Expired",
}

export interface Comment {
  title: string;
  description: string;
  time: string; // ISO 8601 datetime string
  uuid: string;
  email: string;
  firstName: string;
  lastName: string;
}

export default BoardStatus;
