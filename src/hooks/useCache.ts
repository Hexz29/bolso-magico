import { useCallback, useRef } from 'react';

interface CacheEntry<T> {
  data: T;
  timestamp: number;
  ttl: number;
}

interface CacheOptions {
  ttl?: number; // Time to live in milliseconds
  maxSize?: number;
}

export const useCache = <T>(options: CacheOptions = {}) => {
  const { ttl = 5 * 60 * 1000, maxSize = 100 } = options; // Default 5 minutes TTL
  const cache = useRef(new Map<string, CacheEntry<T>>());

  const get = useCallback((key: string): T | null => {
    const entry = cache.current.get(key);
    
    if (!entry) {
      return null;
    }

    const now = Date.now();
    if (now - entry.timestamp > entry.ttl) {
      cache.current.delete(key);
      return null;
    }

    return entry.data;
  }, []);

  const set = useCallback((key: string, data: T, customTtl?: number): void => {
    // Clean up expired entries if cache is getting large
    if (cache.current.size >= maxSize) {
      const now = Date.now();
      for (const [k, entry] of cache.current.entries()) {
        if (now - entry.timestamp > entry.ttl) {
          cache.current.delete(k);
        }
      }
      
      // If still too large, remove oldest entries
      if (cache.current.size >= maxSize) {
        const entries = Array.from(cache.current.entries());
        entries.sort((a, b) => a[1].timestamp - b[1].timestamp);
        const toRemove = entries.slice(0, Math.floor(maxSize * 0.2));
        toRemove.forEach(([k]) => cache.current.delete(k));
      }
    }

    cache.current.set(key, {
      data,
      timestamp: Date.now(),
      ttl: customTtl || ttl,
    });
  }, [ttl, maxSize]);

  const remove = useCallback((key: string): void => {
    cache.current.delete(key);
  }, []);

  const clear = useCallback((): void => {
    cache.current.clear();
  }, []);

  const has = useCallback((key: string): boolean => {
    const entry = cache.current.get(key);
    if (!entry) return false;
    
    const now = Date.now();
    if (now - entry.timestamp > entry.ttl) {
      cache.current.delete(key);
      return false;
    }
    
    return true;
  }, []);

  return {
    get,
    set,
    remove,
    clear,
    has,
  };
};
