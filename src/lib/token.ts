export function parseJwt(token: string) {
  const payloadBase64 = token.split(".")[1];
  const payloadJson = atob(
    payloadBase64.replace(/-/g, "+").replace(/_/g, "/")
  );
  return JSON.parse(payloadJson);
}

export function isTokenValid(token: string | null): boolean {
  if (!token) return false;

  try {
    const payload = parseJwt(token);

    if (!payload.exp) return false;

    return payload.exp > Math.floor(Date.now() / 1000);
  } catch {
    return false;
  }
}