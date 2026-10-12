// Optional public API adapter.
//
// TradeSphere ships with NO external API configured: every service works from seeded
// local data. If you have a real, CORS-enabled public API, set VITE_PUBLIC_API_BASE_URL
// (and, for the catalogue, VITE_PUBLIC_API_PRODUCTS_PATH) in a .env file. Nothing in
// this file invents endpoints: it only calls the base URL and paths you provide.
//
// Never put private keys in VITE_ variables: they are bundled into the public site.

const BASE_URL = (import.meta.env.VITE_PUBLIC_API_BASE_URL ?? '').trim().replace(/\/+$/, '');

export const isApiConfigured = Boolean(BASE_URL);

export class ApiError extends Error {
  constructor(message, status) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
  }
}

/** GET a JSON resource from the configured public API. Rejects when no API is configured. */
export async function apiGet(path, { signal, timeoutMs = 8000 } = {}) {
  if (!isApiConfigured) throw new ApiError('No public API is configured.', 0);
  const controller = new AbortController();
  const timer = window.setTimeout(() => controller.abort(), timeoutMs);
  signal?.addEventListener('abort', () => controller.abort());
  try {
    const response = await fetch(`${BASE_URL}/${String(path).replace(/^\/+/, '')}`, { headers: { Accept: 'application/json' }, signal: controller.signal });
    if (!response.ok) throw new ApiError(`The public API responded with status ${response.status}.`, response.status);
    return await response.json();
  } catch (error) {
    if (error instanceof ApiError) throw error;
    throw new ApiError(error.name === 'AbortError' ? 'The public API took too long to respond.' : 'The public API could not be reached.', 0);
  } finally {
    window.clearTimeout(timer);
  }
}
