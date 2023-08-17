import { AcademicTitle } from "./AcademicTitleEnum";
import { UserProfile } from "./UserProfile";

export interface Employee {
  firstName: string | null;
  lastName: string | null;
  phoneNumber: string | null;
  academicTitle: AcademicTitle | null;
  uuid: string | null;
  userProfile: UserProfile | null;
}
