export function storeToken(token: string) {
  localStorage.setItem("token", token);
}

export function storeUserUuid(uuid: string) {
  localStorage.setItem("uuid", uuid);
}

export function scheduleLogout(expirationTime: string, onLogout: () => void) {
  const now = new Date().getTime();
  const expirationTimestamp = new Date(expirationTime).getTime();
  const timeUntilExpiration = expirationTimestamp - now;

  setTimeout(() => {
    localStorage.removeItem("token");
    localStorage.removeItem("uuid");

    onLogout();
  }, timeUntilExpiration);
}

export const getStoredToken = () => {
  const storedToken = localStorage.getItem("token");
  return storedToken ? storedToken : null;
};

export const getStoredUUID = () => {
  const storedUUID = localStorage.getItem("uuid");
  return storedUUID ? storedUUID : null;
};
