import type { SessionPayload } from './auth';
import { getEnv, getRequiredEnv } from './env';

type HeaderLike = {
  get(name: string): string | null | undefined;
};

const SESSION_SECRET = getRequiredEnv('ADMIN_SESSION_SECRET').trim();
const SESSION_FINGERPRINT_SALT = getEnv('ADMIN_FINGERPRINT_SALT')?.trim() ?? SESSION_SECRET;

const textEncoder = new TextEncoder();

function bufferToBase64Url(buffer: ArrayBuffer) {
  const bytes = new Uint8Array(buffer);
  let binary = '';
  for (let i = 0; i < bytes.byteLength; i += 1) {
    binary += String.fromCharCode(bytes[i]!);
  }
  return btoa(binary).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/g, '');
}

function base64UrlToString(value: string): string {
  const normalized = value.replace(/-/g, '+').replace(/_/g, '/');
  const padded = normalized.padEnd(normalized.length + ((4 - (normalized.length % 4)) % 4), '=');
  const binary = atob(padded);
  let result = '';
  for (let i = 0; i < binary.length; i += 1) {
    result += String.fromCharCode(binary.charCodeAt(i));
  }
  return result;
}

async function hmacSha256(data: string): Promise<string> {
  const key = await crypto.subtle.importKey(
    'raw',
    textEncoder.encode(SESSION_SECRET),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign'],
  );
  const signature = await crypto.subtle.sign('HMAC', key, textEncoder.encode(data));
  return bufferToBase64Url(signature);
}

function constantTimeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) {
    return false;
  }
  let mismatch = 0;
  for (let i = 0; i < a.length; i += 1) {
    mismatch |= a.charCodeAt(i)! ^ b.charCodeAt(i)!;
  }
  return mismatch === 0;
}

function extractClientInfo(headers: HeaderLike) {
  const forwarded = headers.get('x-forwarded-for');
  const [forwardedIp] = typeof forwarded === 'string' ? forwarded.split(',').map((part) => part.trim()).filter(Boolean) : [];
  const realIp = headers.get('x-real-ip');
  const ip = forwardedIp || realIp || '';
  return {
    ip,
    userAgent: headers.get('user-agent') ?? '',
    language: headers.get('accept-language') ?? '',
  };
}

async function sha256Base64Url(value: string): Promise<string> {
  const digest = await crypto.subtle.digest('SHA-256', textEncoder.encode(value));
  return bufferToBase64Url(digest);
}

export async function fingerprintFromHeaders(headers: HeaderLike): Promise<string> {
  const info = extractClientInfo(headers);
  const raw = `${SESSION_FINGERPRINT_SALT}|${info.ip}|${info.userAgent}|${info.language}`;
  return sha256Base64Url(raw);
}

export async function validateSessionTokenOnEdge(token: string, fingerprint: string): Promise<SessionPayload | null> {
  const [data, signature] = token.split('.');
  if (!data || !signature) {
    return null;
  }

  const expectedSignature = await hmacSha256(data);
  if (!constantTimeEqual(signature, expectedSignature)) {
    return null;
  }

  try {
    const json = base64UrlToString(data);
    const payload = JSON.parse(json) as SessionPayload;
    if (payload.expiresAt < Date.now()) {
      return null;
    }
    if (payload.fingerprint !== fingerprint) {
      return null;
    }
    return payload;
  } catch {
    return null;
  }
}
