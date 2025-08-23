import { HOUR, MINUTE } from '@/common/rate-limiter/constant';

export const AUTH_COOKIE_ACCESS_TOKEN = '__matrio.atk';
export const AUTH_COOKIE_REFRESH_TOKEN = '__matrio.rtk';
export const AUTH_COOKIE_IS_GUEST = '__matrio.isGuest';

export const AUTH_COOKIE_REFRESH_MAX_AGE = 30 * 24 * 60 * 60 * 1000;
export const AUTH_COOKIE_ACCESS_MAX_AGE = 15 * 60 * 1000;

export const AUTH_RATE_LIMITS = {
  guest: { default: { ttl: HOUR, limit: 1 } }, // 1 request per hour
  signup: { default: { ttl: MINUTE * 15, limit: 5 } }, // 5 requests per 15 minutes
  signin: { default: { ttl: MINUTE * 15, limit: 5 } }, // 5 requests per 15 minutes
  emailVerify: { default: { ttl: MINUTE * 15, limit: 5 } }, // 3 requests per 1 hour
  resendVerificationEmail: { default: { ttl: HOUR, limit: 3 } }, // 3 requests per 1 hour
};
