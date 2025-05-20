export const todoQueryKeys = {
  all: ['todos'] as const,
  details: () => [...todoQueryKeys.all, 'dedatil'] as const,
  detail: (id: string) => [...todoQueryKeys.details(), id] as const,
};
