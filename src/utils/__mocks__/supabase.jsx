export const supabase = {
  from: jest.fn().mockReturnThis(),
  select: jest.fn().mockResolvedValue({ data: [], error: null }),
  insert: jest.fn().mockResolvedValue({ error: null }),
  delete: jest.fn().mockResolvedValue({ data: [], error: null }),
  eq: jest.fn().mockReturnThis(),
};