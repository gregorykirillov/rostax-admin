

export const formDataToJson = data => {
    const result = {};

    for (const key of data.keys()) {
        result[key] = data.get(key);
    }

    return JSON.stringify(result);
};
