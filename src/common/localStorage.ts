export function getItem(item: string): string | undefined;
export function getItem(item: string, defaultValue: string): string;
export function getItem(item: string, defaultValue?: string): string | undefined {
  let result = defaultValue;

  try {
    const value = localStorage.getItem(item);
    if (value !== null) {
      result = value;
    }
  } catch {
    console.log(`localStorage/getItem(): Could not access local storage.`);
  }

  return result;
}

export function setItem(item: string, value: string): void {
  try {
    localStorage.setItem(item, value);
  } catch {
    console.log(`localStorage/setItem(): Could not access local storage.`);
  }
}

export function removeItem(item: string): void {
  try {
    localStorage.removeItem(item);
  } catch {
    console.log(`localStorage/removeItem(): Could not access local storage.`);
  }
}
