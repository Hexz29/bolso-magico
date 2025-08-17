// Application constants
export const APP_CONFIG = {
  name: 'Bolso Mágico',
  version: '1.0.0',
  description: 'Sua carteira digital inteligente',
} as const;

// Cache configuration
export const CACHE_CONFIG = {
  defaultTTL: 5 * 60 * 1000, // 5 minutes
  maxSize: 100,
  staleTime: 2 * 60 * 1000, // 2 minutes
  gcTime: 5 * 60 * 1000, // 5 minutes
} as const;

// Query keys for React Query
export const QUERY_KEYS = {
  transactions: (userId?: string, limit?: number) => 
    ['transactions', userId, limit].filter(Boolean),
  accounts: (userId?: string) => ['accounts', userId].filter(Boolean),
  goals: (userId?: string) => ['goals', userId].filter(Boolean),
  user: (userId?: string) => ['user', userId].filter(Boolean),
} as const;

// Transaction categories
export const TRANSACTION_CATEGORIES = {
  income: [
    'Salário',
    'Freelance',
    'Investimentos',
    'Vendas',
    'Outros'
  ],
  expense: [
    'Alimentação',
    'Transporte',
    'Moradia',
    'Saúde',
    'Educação',
    'Entretenimento',
    'Compras',
    'Outros'
  ]
} as const;

// Currency formatting
export const CURRENCY_CONFIG = {
  locale: 'pt-BR',
  currency: 'BRL',
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
} as const;

// Date formatting
export const DATE_CONFIG = {
  locale: 'pt-BR',
  shortFormat: {
    day: '2-digit' as const,
    month: '2-digit' as const,
  },
  longFormat: {
    day: '2-digit' as const,
    month: 'long' as const,
    year: 'numeric' as const,
  },
} as const;

// Performance thresholds
export const PERFORMANCE_CONFIG = {
  debounceDelay: 300,
  throttleLimit: 100,
  lazyLoadThreshold: 0.1,
  maxRenderTime: 16, // 60fps = 16ms per frame
} as const;
