// Performance utilities for React components
export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  wait: number
): ((...args: Parameters<T>) => void) => {
  let timeout: NodeJS.Timeout;
  
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
};

export const throttle = <T extends (...args: any[]) => any>(
  func: T,
  limit: number
): ((...args: Parameters<T>) => void) => {
  let inThrottle: boolean;
  
  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
};

// Lazy loading utility
export const createLazyComponent = <T extends React.ComponentType<any>>(
  importFunc: () => Promise<{ default: T }>,
  fallback?: React.ComponentType
) => {
  return React.lazy(importFunc);
};

// Memory usage monitoring (development only)
export const logMemoryUsage = (label: string) => {
  if (process.env.NODE_ENV === 'development' && 'memory' in performance) {
    const memInfo = (performance as any).memory;
    console.log(`[${label}] Memory Usage:`, {
      used: `${Math.round(memInfo.usedJSHeapSize / 1024 / 1024)} MB`,
      total: `${Math.round(memInfo.totalJSHeapSize / 1024 / 1024)} MB`,
      limit: `${Math.round(memInfo.jsHeapSizeLimit / 1024 / 1024)} MB`,
    });
  }
};

// Component render tracking
export const withRenderTracking = <P extends object>(
  Component: React.ComponentType<P>,
  componentName: string
) => {
  return React.memo((props: P) => {
    if (process.env.NODE_ENV === 'development') {
      console.log(`[RENDER] ${componentName}`);
    }
    return <Component {...props} />;
  });
};
