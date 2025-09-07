import { IUser } from "@/types";
import { ApiClient } from "./api.service";
import {
  TUserSignup,
  TUserSignin,
  TEmailVerification,
  TResendVerificationEmail,
} from "@matrio/shared/schemas";

export type TAuthResponse = {
  accessToken: string;
};

export class AuthService extends ApiClient {
  async guest() {
    return this.post<TAuthResponse>("/auth/guest");
  }

  async signup(data: TUserSignup) {
    return this.post<TAuthResponse>("/auth/signup", data);
  }

  async signin(data: TUserSignin) {
    return this.post<TAuthResponse>("/auth/signin", data);
  }

  async signout() {
    return this.post("/auth/signout");
  }

  async verifyEmail(data: TEmailVerification) {
    return this.post<TAuthResponse>("/auth/email-verify", data);
  }

  async resendVerificationEmail(data: TResendVerificationEmail) {
    return this.post("/auth/resend-verification-email", data);
  }

  async refreshToken() {
    return this.post<TAuthResponse>("/auth/refresh");
  }

  async session() {
    return this.get<{ user: IUser }>("/auth/session");
  }

  async checkSession() {
    return this.post("/auth/session/check");
  }
}

export const authService = new AuthService({});
