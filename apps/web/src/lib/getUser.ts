"use server";

import { cookies } from "next/headers";
import { jwtVerify } from "jose";
import { IUser } from "@/types/user.type";

export const getUser = async (): Promise<any> => {
  const cookie = await cookies();

  const accessToken = cookie.get("__matrio.atk")?.value;

  if (!accessToken) return null;

  try {
    const { payload } = await jwtVerify(
      accessToken,
      new TextEncoder().encode(process.env.JWT_SECRET),
    );
    return payload as unknown as IUser;
  } catch {
    return null;
  }
};
