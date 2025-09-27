type EnvSource = NodeJS.ProcessEnv;

function getEnvSource(): EnvSource {
  return process.env;
}

export function getEnv(name: string): string | undefined {
  const value = getEnvSource()[name];
  return typeof value === 'string' && value.length > 0 ? value : undefined;
}

export function getRequiredEnv(name: string): string {
  const value = getEnv(name);
  if (!value) {
    throw new Error(`Missing required environment variable "${name}"`);
  }
  return value;
}

export function getNumberEnv(name: string, fallback: number): number {
  const raw = getEnv(name);
  if (!raw) {
    return fallback;
  }
  const parsed = Number.parseInt(raw, 10);
  return Number.isFinite(parsed) ? parsed : fallback;
}
