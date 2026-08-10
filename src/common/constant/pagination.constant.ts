export const PAGINATION_DEFAULT = {
  PAGE: 1,
  PAGE_SIZE: 10,
  PAGE_SIZE_MAX: 100,
};

export const PAGINATION_ORDER = {
  ASC: 'ASC',
  DESC: 'DESC',
} as const;

export type TPaginationOrder = keyof typeof PAGINATION_ORDER;

export const PAGINATION_SORTBY_PRODUCT = {
  createdAt: 'p.createdAt',
  name: 'p.name',
  price: 'p.price',
} as const;

export type TPaginationSortByProduct = keyof typeof PAGINATION_SORTBY_PRODUCT;
