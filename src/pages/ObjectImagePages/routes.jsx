export const getObjectImageShowPath = objectId =>
    `/objectsImage/${objectId}/show`;

export const getObjectImageCreatePath = (objectId, from) =>
    `/objectsImage/create?objectId=${objectId}&redirectTo=${from}`;
