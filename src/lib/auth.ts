import { cookies, headers } from 'next/headers';
import { createHmac, createHash, pbkdf2Sync, timingSafeEqual } from 'node:crypto';

import { getEnv, getNumberEnv, getRequiredEnv } from './env';

type HeaderAccessor = {
  get(name: string): string | null | undefined;
};

const ADMIN_EMAIL = getRequiredEnv('ADMIN_EMAIL').trim().toLowerCase();
const ADMIN_PASSWORD_HASH = getRequiredEnv('ADMIN_PASSWORD_HASH').trim();
const ADMIN_PASSWORD_SALT = getRequiredEnv('ADMIN_PASSWORD_SALT').trim();
const ADMIN_PASSWORD_ITERATIONS = getNumberEnv('ADMIN_PASSWORD_ITERATIONS', 210_000);
const SESSION_SECRET = getRequiredEnv('ADMIN_SESSION_SECRET').trim();
const SESSION_FINGERPRINT_SALT = getEnv('ADMIN_FINGERPRINT_SALT')?.trim() ?? SESSION_SECRET;
const COOKIE_NAME = 'zh_admin_session';
const SESSION_TTL_SECONDS = getNumberEnv('ADMIN_SESSION_TTL_SECONDS', 60 * 60 * 8);
const PBKDF2_KEY_LENGTH = 64;
const PBKDF2_DIGEST = 'sha512';

export type SessionPayload = {
  sub: string;
  issuedAt: number;
  expiresAt: number;
  fingerprint: string;
};

function derivePasswordHash(password: string): string {
  return pbkdf2Sync(password, ADMIN_PASSWORD_SALT, ADMIN_PASSWORD_ITERATIONS, PBKDF2_KEY_LENGTH, PBKDF2_DIGEST).toString('base64');
}

function constantTimeEqualUtf8(a: string, b: string) {
  const bufA = Buffer.from(a, 'utf8');
  const bufB = Buffer.from(b, 'utf8');
  if (bufA.length !== bufB.length) {
    return false;
  }
  return timingSafeEqual(bufA, bufB);
}

function constantTimeEqualBase64(a: string, b: string) {
  const bufA = Buffer.from(a, 'base64');
  const bufB = Buffer.from(b, 'base64');
  if (bufA.length !== bufB.length) {
    return false;
  }
  return timingSafeEqual(bufA, bufB);
}

function sign(data: string) {
  const hmac = createHmac('sha256', SESSION_SECRET);
  hmac.update(data);
  return hmac.digest('base64url');
}

function encode(payload: SessionPayload) {
  const data = Buffer.from(JSON.stringify(payload), 'utf8').toString('base64url');
  const signature = sign(data);
  return `${data}.${signature}`;
}

function decode(token: string, expectedFingerprint?: string): SessionPayload | null {
  const [data, signature] = token.split('.');
  if (!data || !signature) {
    return null;
  }

  const expectedSignature = sign(data);
  const provided = Buffer.from(signature, 'utf8');
  const expected = Buffer.from(expectedSignature, 'utf8');

  if (provided.length !== expected.length || !timingSafeEqual(provided, expected)) {
    return null;
  }

  try {
    const json = Buffer.from(data, 'base64url').toString('utf8');
    const payload = JSON.parse(json) as SessionPayload;
    if (payload.expiresAt < Date.now()) {
      return null;
    }
    if (expectedFingerprint && payload.fingerprint !== expectedFingerprint) {
      return null;
    }
    return payload;
  } catch {
    return null;
  }
}

function readClientInfo(source: HeaderAccessor) {
  const forwarded = source.get('x-forwarded-for');
  const [forwardedIp] = typeof forwarded === 'string' ? forwarded.split(',').map((part) => part.trim()).filter(Boolean) : [];
  const realIp = source.get('x-real-ip');
  const ip = forwardedIp || realIp || '';
  return {
    ip,
    userAgent: source.get('user-agent') ?? '',
    language: source.get('accept-language') ?? '',
  };
}

function computeFingerprint(info: ReturnType<typeof readClientInfo>): string {
  const raw = `${SESSION_FINGERPRINT_SALT}|${info.ip}|${info.userAgent}|${info.language}`;
  return createHash('sha256').update(raw).digest('base64url');
}

async function getCurrentClientInfo() {
  const headerSource = await headers();
  return readClientInfo(headerSource);
}

async function getCurrentRequestFingerprint(): Promise<string> {
  return computeFingerprint(await getCurrentClientInfo());
}

export async function getCurrentRequestIp(): Promise<string> {
  const info = await getCurrentClientInfo();
  return info.ip || 'unknown';
}

export function createFingerprintFromHeaders(source: HeaderAccessor): string {
  return computeFingerprint(readClientInfo(source));
}

export function validateSessionToken(token: string, fingerprint: string): SessionPayload | null {
  return decode(token, fingerprint);
}

export const ADMIN_SESSION_COOKIE_NAME = COOKIE_NAME;

export function verifyAdminCredentials(email: string, password: string) {
  const normalizedEmail = email.trim().toLowerCase();
  if (!constantTimeEqualUtf8(normalizedEmail, ADMIN_EMAIL)) {
    return false;
  }

  const derivedHash = derivePasswordHash(password);
  return constantTimeEqualBase64(derivedHash, ADMIN_PASSWORD_HASH);
}

export async function createAdminSession() {
  const now = Date.now();
  const fingerprint = await getCurrentRequestFingerprint();
  const payload: SessionPayload = {
    sub: ADMIN_EMAIL,
    issuedAt: now,
    expiresAt: now + SESSION_TTL_SECONDS * 1000,
    fingerprint,
  };

  const token = encode(payload);
  const cookieStore = await cookies();
  cookieStore.set(COOKIE_NAME, token, {
    httpOnly: true,
    sameSite: 'strict',
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: SESSION_TTL_SECONDS,
  });
}

export async function getAdminSession(): Promise<SessionPayload | null> {
  const cookieStore = await cookies();
  const cookie = cookieStore.get(COOKIE_NAME);
  if (!cookie?.value) {
    return null;
  }
  const fingerprint = await getCurrentRequestFingerprint();
  return decode(cookie.value, fingerprint);
}

export async function destroyAdminSession() {
  const cookieStore = await cookies();
  cookieStore.delete(COOKIE_NAME);
}

export async function assertAdminSession() {
  const session = await getAdminSession();
  if (!session) {
    throw new Error('UNAUTHORIZED');
  }
  return session;
}
