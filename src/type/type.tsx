export interface IUser {
  _id: string;
  name: string;
  email: string;
  phone?: string;
  password: string;
  profilePhoto?: string;
  role: USER_ROLES;
  status: UserStatus;
  address?: string;
  emailVerified: boolean;
  createdAt: string;
  updatedAt: string;
}
export enum USER_ROLES {
  ADMIN = "ADMIN",
  USER = "USER",
}

export enum UserStatus {
  ACTIVE = "ACTIVE",
  DELETED = "DELETED",
  BLOCKED = "BLOCKED",
}
