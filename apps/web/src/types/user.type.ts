export interface IUser {
  id: string;
  name?: string;
  email?: string;
  createdAt: Date;
  username: string;
  role: "USER" | "GUEST";
  avatar?: {
    id: string;
    name: string;
    url: string;
  };
  coins: number;
  level: number;
}
