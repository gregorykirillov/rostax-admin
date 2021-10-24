

export const getHeadersFromDataType = dataType =>
    dataType === 'json' ? {'Content-Type': 'application/json'} : undefined;
