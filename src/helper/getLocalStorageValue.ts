export function getLocalStorageValue<T>(name: string) {
  const data = localStorage.getItem(name);
  return data ? (JSON.parse(data) as T) : [];
}
