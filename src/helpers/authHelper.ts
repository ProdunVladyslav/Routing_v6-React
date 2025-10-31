export function getLoggedInUser() {
  const raw = localStorage.getItem("loggedInUserId");
  try {
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function getLoggedInUserId(): string | null {
  return getLoggedInUser()?.id ?? null;
}