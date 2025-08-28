export interface IUser {
  id: string;
  name?: string;
  email?: string;
  image?: string;
  emailVerified?: Date;
  createdAt: Date;
  username: string;
  role: "USER" | "ADMIN" | "GUEST";
}
