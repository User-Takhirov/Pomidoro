export function loadState(key: string) {
  try {
    const serializedState = localStorage.getItem(key);

    if (!serializedState) return undefined;

    return JSON.parse(serializedState);
  } catch (e) {
    return undefined;
  }
}

export function saveState(key: string | any, state: string | any) {
  try {
    const serializedState = JSON.stringify(state);

    localStorage.setItem(key, serializedState);
  } catch (e) {}
}
