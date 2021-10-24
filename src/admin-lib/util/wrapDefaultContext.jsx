const createOutOfContextHandler = (message='Элемент был использован вне контекста') =>
    () => {throw new Error(message);};


export const wrapDefaultContext = (obj, message) => {
    const outOfContextHandler = createOutOfContextHandler(message);

    return Object.getOwnPropertyNames(obj)
        .reduce(
            (acc, name) => {
                if (typeof obj[name] === 'function') {
                    acc[name] = outOfContextHandler;
                } else {
                    Object.defineProperty(acc, name, {get: outOfContextHandler});
                }

                return acc;
            },
            {},
        );
};

