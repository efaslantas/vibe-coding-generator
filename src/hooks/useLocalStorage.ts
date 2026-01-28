import { useState, useEffect } from 'react';

export function useLocalStorage<T>(key: string, initialValue: T): [T, (value: T | ((prev: T) => T)) => void] {
  // Get stored value or use initial value
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.warn(`Error reading localStorage key "${key}":`, error);
      return initialValue;
    }
  });

  // Update localStorage when value changes
  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(storedValue));
    } catch (error) {
      console.warn(`Error setting localStorage key "${key}":`, error);
    }
  }, [key, storedValue]);

  return [storedValue, setStoredValue];
}

// Storage keys
export const STORAGE_KEYS = {
  LANGUAGE: 'vibe-coding-language',
  PROJECT_NAME: 'vibe-coding-project-name',
  SELECTED_TECHNOLOGIES: 'vibe-coding-technologies',
  SELECTED_TIERS: 'vibe-coding-tiers',
  LAST_PRESET: 'vibe-coding-last-preset',
} as const;
