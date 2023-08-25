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
  status: string;
  boardType: BoardType;
  uuid: string;
  memberships: Membership[];
}
