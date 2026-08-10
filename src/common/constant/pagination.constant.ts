export const PAGINATION_ORDER = {
  ASC: 'ASC',
  DESC: 'DESC',
} as const;

export type TPaginationOrder = keyof typeof PAGINATION_ORDER;

export const PAGINATION_DEFAULT = {
  PAGE: 1,
  PAGE_SIZE: 20,
  PAGE_SIZE_MAX: 100,
};
