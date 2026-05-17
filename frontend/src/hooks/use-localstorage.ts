import { useCallback, useEffect, useRef, useState } from "react";

const readFromStorage = <T>(key: string, initialValue: T): T => {
  try {
    const storedValue = localStorage.getItem(key);
    if (storedValue !== null) return JSON.parse(storedValue) as T;
  } catch (error) {
    console.warn(
      `[useLocalStorage] impossibile leggere la key "${key}: "`,
      error,
    );
  }

  return initialValue;
};

const writeToStorage = <T>(key: string, value: T): void => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.warn(
      `[useLocalStorage] impossibile scrivere la key "${key}: "`,
      error,
    );
  }
};

const removeFromStorage = (key: string) => {
  try {
    localStorage.removeItem(key);
  } catch (error) {
    console.warn(
      `[useLocalStorage] impossibile rimuovere la key "${key}"`,
      error,
    );
  }
};

const useLocalStorage = <T>(key: string, initialValue: T) => {
  const isMounted = useRef(false);

  const [value, setValue] = useState<T>(() =>
    readFromStorage(key, initialValue),
  );

  useEffect(() => {
    if (!isMounted.current) {
      isMounted.current = true;
      return;
    }

    writeToStorage(key, value);
  }, [key, value]);

  const remove = useCallback(() => {
    removeFromStorage(key);
    setValue(initialValue);
  }, [key, initialValue]);

  return { value, setValue, remove };
};

export default useLocalStorage;
