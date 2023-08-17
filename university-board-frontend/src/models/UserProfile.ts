export interface UserProfile {
  email: string | null;
  role: Role | null;
  privileges: Privilege[] | null;
  uuid: string | null;
}

export interface Role {
  uuid: string | null;
  name: string | null;
  privileges: Privilege[] | null;
}

export interface Privilege {
  code: string | null;
  name: string | null;
}
