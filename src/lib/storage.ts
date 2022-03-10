const webStorage = typeof window !== "undefined" && window.localStorage;

const getItem = async (key: string) => {
  if (key) {
    return webStorage.getItem(key);
  }

  return null;
};

const setItem = async (key: string, payload: string) => {
  if (key && payload) {
    return webStorage.setItem(key, payload);
  }

  return null;
};

export { getItem, setItem };
