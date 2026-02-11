export function getUrl(path: string): string {
  // Remove any leading slashes to avoid double slashes
  const cleanPath = path.replace(/^\/\/+/, '');
  const baseUrl = import.meta.env.BASE_URL || '/';
  
  // Ensure base URL ends with exactly one slash
  const normalizedBase = baseUrl.endsWith('/') ? baseUrl : `${baseUrl}/`;
  
  // In development, include the full base URL
  if (import.meta.env.DEV) {
    return `${normalizedBase}${cleanPath}`;
  }
  
  // In production, ensure we don't have double slashes
  return `${normalizedBase}${cleanPath}`.replace(/([^:]\/)\/+/g, '$1');
}
