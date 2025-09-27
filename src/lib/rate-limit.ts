import { getNumberEnv } from './env';

const MAX_ATTEMPTS = Math.max(1, getNumberEnv('ADMIN_LOGIN_MAX_ATTEMPTS', 5));
const WINDOW_MINUTES = Math.max(1, getNumberEnv('ADMIN_LOGIN_WINDOW_MINUTES', 15));
const BLOCK_MINUTES = Math.max(WINDOW_MINUTES, getNumberEnv('ADMIN_LOGIN_BLOCK_MINUTES', 30));

const WINDOW_MS = WINDOW_MINUTES * 60 * 1000;
const BLOCK_MS = BLOCK_MINUTES * 60 * 1000;

type AttemptRecord = {
  attempts: number;
  firstAttempt: number;
  blockedUntil: number | null;
};

type RateLimitResult = {
  blocked: boolean;
  retryAfterMs?: number;
  remainingAttempts?: number;
};

const attemptStore = new Map<string, AttemptRecord>();

function getRecord(key: string): AttemptRecord | undefined {
  const record = attemptStore.get(key);
  if (!record) {
    return undefined;
  }

  const now = Date.now();
  if (record.blockedUntil && record.blockedUntil <= now) {
    attemptStore.delete(key);
    return undefined;
  }

  if (now - record.firstAttempt > WINDOW_MS) {
    attemptStore.delete(key);
    return undefined;
  }

  return record;
}

export function getLoginRateLimitStatus(key: string): RateLimitResult {
  const record = getRecord(key);
  if (!record) {
    return { blocked: false, remainingAttempts: MAX_ATTEMPTS };
  }

  if (record.blockedUntil) {
    return { blocked: true, retryAfterMs: Math.max(0, record.blockedUntil - Date.now()) };
  }

  return {
    blocked: false,
    remainingAttempts: Math.max(0, MAX_ATTEMPTS - record.attempts),
  };
}

export function registerLoginFailure(key: string): RateLimitResult {
  const now = Date.now();
  const existing = getRecord(key);

  if (!existing) {
    const nextRecord: AttemptRecord = {
      attempts: 1,
      firstAttempt: now,
      blockedUntil: null,
    };
    attemptStore.set(key, nextRecord);
    return {
      blocked: false,
      remainingAttempts: Math.max(0, MAX_ATTEMPTS - nextRecord.attempts),
    };
  }

  if (existing.blockedUntil && existing.blockedUntil > now) {
    return {
      blocked: true,
      retryAfterMs: Math.max(0, existing.blockedUntil - now),
      remainingAttempts: 0,
    };
  }

  existing.attempts += 1;

  if (existing.attempts >= MAX_ATTEMPTS) {
    existing.blockedUntil = now + BLOCK_MS;
    attemptStore.set(key, existing);
    return {
      blocked: true,
      retryAfterMs: Math.max(0, existing.blockedUntil - now),
      remainingAttempts: 0,
    };
  }

  attemptStore.set(key, existing);
  return {
    blocked: false,
    remainingAttempts: Math.max(0, MAX_ATTEMPTS - existing.attempts),
  };
}

export function registerLoginSuccess(key: string) {
  attemptStore.delete(key);
}
