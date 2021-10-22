const DATA_TYPE_TO_CONTENT_TYPE = {
    'json': 'application/json',
    'multipart': 'multipart/form-data',
};


export const getContentTypeFromDataType = dataType =>
    DATA_TYPE_TO_CONTENT_TYPE[dataType];
