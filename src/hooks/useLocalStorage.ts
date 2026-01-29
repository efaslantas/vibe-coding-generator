import { useState, useEffect } from 'react';

// Type validators for each storage key
type Validator<T> = (value: unknown) => value is T;

const validators: Record<string, Validator<unknown>> = {
  'vibe-coding-language': (v): v is 'tr' | 'en' => v === 'tr' || v === 'en',
  'vibe-coding-project-name': (v): v is string => typeof v === 'string' && v.length <= 100,
  'vibe-coding-technologies': (v): v is Record<string, string[]> => {
    if (typeof v !== 'object' || v === null || Array.isArray(v)) return false;
    const obj = v as Record<string, unknown>;
    return Object.entries(obj).every(
      ([key, val]) =>
        typeof key === 'string' &&
        Array.isArray(val) &&
        val.every((item) => typeof item === 'string' && item.length <= 50)
    );
  },
  'vibe-coding-tiers': (v): v is number[] =>
    Array.isArray(v) && v.every((item) => typeof item === 'number' && item >= 1 && item <= 5),
  'vibe-coding-last-preset': (v): v is string | null =>
    v === null || (typeof v === 'string' && v.length <= 50),
  'vibe-coding-ai-tools': (v): v is string[] =>
    Array.isArray(v) && v.every((item) => typeof item === 'string' && item.length <= 20),
};

export function useLocalStorage<T>(key: string, initialValue: T): [T, (value: T | ((prev: T) => T)) => void] {
  // Get stored value or use initial value with validation
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key);
      if (!item) return initialValue;

      const parsed = JSON.parse(item);

      // Validate parsed data if validator exists
      const validator = validators[key];
      if (validator && !validator(parsed)) {
        console.warn(`Invalid data in localStorage for key "${key}", using default`);
        window.localStorage.removeItem(key);
        return initialValue;
      }

      return parsed as T;
    } catch (error) {
      console.warn(`Error reading localStorage key "${key}":`, error);
      // Remove corrupted data
      try {
        window.localStorage.removeItem(key);
      } catch {
        // Ignore removal errors
      }
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
  SELECTED_AI_TOOLS: 'vibe-coding-ai-tools',
} as const;
