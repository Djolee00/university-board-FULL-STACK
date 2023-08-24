export function storeToken(token: string) {
  localStorage.setItem("token", token);
}

export function storeUserUuid(uuid: string) {
  localStorage.setItem("uuid", uuid);
}

export function clearStorage() {
  localStorage.clear();
}

export const getStoredToken = () => {
  const storedToken = localStorage.getItem("token");
  return storedToken ? storedToken : null;
};

export const getStoredUUID = () => {
  const storedUUID = localStorage.getItem("uuid");
  return storedUUID ? storedUUID : null;
};
