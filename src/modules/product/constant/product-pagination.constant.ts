export const PAGINATION_SORTBY_PRODUCT = {
  createdAt: 'p.createdAt',
  name: 'p.name',
  price: 'p.price',
} as const;

export type TPaginationSortByProduct = keyof typeof PAGINATION_SORTBY_PRODUCT;
