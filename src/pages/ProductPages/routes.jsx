export const getProductShowPath = productId =>
    `/products/${productId}/show`;

export const getProductEditPath = productId =>
    `/products/${productId}/edit`;

export const getProductCreatePath = (categoryId, from) =>
    `/products/create?categoryId=${categoryId}&redirectTo=${from}`;
