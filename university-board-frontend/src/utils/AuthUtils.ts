export function storeToken(token: string) {
  localStorage.setItem("token", token);
}

export function storeUserUuid(uuid: string) {
  localStorage.setItem("uuid", uuid);
}

export function storePrivileges(privileges: string[]) {
  const jsonPrivileges = JSON.stringify(privileges);
  localStorage.setItem("privileges", jsonPrivileges);
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

export const getStoredPrivileges = (): string[] => {
  const privilegesJSON = localStorage.getItem("privileges");

  if (!privilegesJSON) {
    return [];
  }

  try {
    const privileges = JSON.parse(privilegesJSON);
    if (
      Array.isArray(privileges) &&
      privileges.every((item) => typeof item === "string")
    ) {
      return privileges;
    }
  } catch (error) {}
  return [];
};
