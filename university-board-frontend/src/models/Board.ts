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
  boardFiles: BoardFile[] | null;
}

export enum BoardStatus {
  PENDING = "Pending",
  ACTIVE = "Active",
  CLOSED = "Closed",
  EXPIRED = "Expired",
}

export interface Comment {
  title: string | null;
  description: string | null;
  time: string | null; // ISO 8601 datetime string
  uuid: string | null;
  email: string | null;
  firstName: string | null;
  lastName: string | null;
}

export interface BoardFile {
  uuid: string | null;
  originalName: string | null;
  type: string | null;
}

export default BoardStatus;
