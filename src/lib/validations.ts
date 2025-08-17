import { z } from 'zod';

// Transaction validation schema
export const transactionSchema = z.object({
  id: z.number().optional(),
  description: z.string().min(1, 'Descrição é obrigatória').max(255, 'Descrição muito longa'),
  amount: z.number().positive('Valor deve ser positivo'),
  type: z.enum(['income', 'expense'], {
    required_error: 'Tipo é obrigatório',
    invalid_type_error: 'Tipo deve ser receita ou despesa'
  }),
  category: z.string().min(1, 'Categoria é obrigatória'),
  date: z.string().refine((date) => !isNaN(Date.parse(date)), {
    message: 'Data inválida'
  }),
  user_id: z.string().uuid().optional(),
});

// Account validation schema
export const accountSchema = z.object({
  id: z.number().optional(),
  name: z.string().min(1, 'Nome é obrigatório').max(100, 'Nome muito longo'),
  type: z.enum(['checking', 'savings', 'credit', 'investment'], {
    required_error: 'Tipo de conta é obrigatório'
  }),
  balance: z.number().default(0),
  user_id: z.string().uuid().optional(),
});

// Goal validation schema
export const goalSchema = z.object({
  id: z.number().optional(),
  title: z.string().min(1, 'Título é obrigatório').max(100, 'Título muito longo'),
  description: z.string().max(500, 'Descrição muito longa').optional(),
  target_amount: z.number().positive('Valor meta deve ser positivo'),
  current_amount: z.number().min(0, 'Valor atual não pode ser negativo').default(0),
  target_date: z.string().refine((date) => !isNaN(Date.parse(date)), {
    message: 'Data inválida'
  }),
  user_id: z.string().uuid().optional(),
});

// Auth validation schemas
export const loginSchema = z.object({
  email: z.string().email('Email inválido'),
  password: z.string().min(6, 'Senha deve ter pelo menos 6 caracteres'),
});

export const registerSchema = z.object({
  email: z.string().email('Email inválido'),
  password: z.string().min(6, 'Senha deve ter pelo menos 6 caracteres'),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: 'Senhas não coincidem',
  path: ['confirmPassword'],
});

// Types inferred from schemas
export type Transaction = z.infer<typeof transactionSchema>;
export type Account = z.infer<typeof accountSchema>;
export type Goal = z.infer<typeof goalSchema>;
export type LoginData = z.infer<typeof loginSchema>;
export type RegisterData = z.infer<typeof registerSchema>;

// Validation helper functions
export const validateTransaction = (data: unknown) => {
  return transactionSchema.safeParse(data);
};

export const validateAccount = (data: unknown) => {
  return accountSchema.safeParse(data);
};

export const validateGoal = (data: unknown) => {
  return goalSchema.safeParse(data);
};

export const validateLogin = (data: unknown) => {
  return loginSchema.safeParse(data);
};

export const validateRegister = (data: unknown) => {
  return registerSchema.safeParse(data);
};
