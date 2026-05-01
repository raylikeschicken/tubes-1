const rawApiUrl = process.env.NEXT_PUBLIC_API_URL || '';

export const API_BASE_URL = rawApiUrl.replace(/\/$/, '') || '';

export function apiUrl(path: string): string {
  // In production, API routes are served from the same domain
  if (!API_BASE_URL) {
    return path.startsWith('/') ? path : `/${path}`;
  }

  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  return `${API_BASE_URL}${normalizedPath}`;
}

export function hasApiUrl(): boolean {
  return true;
}
