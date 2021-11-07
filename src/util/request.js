const DEFAULT_ERROR = {error: 'Неожиданная ошибка на сервере', ok: false, status: 500};

export const request = async (
    url,
    options,
) => {
    let body;
    let ok, status;

    try {
        const res = await fetch(url, options);

        ok = res.ok;
        status = res.status;

        body = await res.json();
    } catch(e) {
        return DEFAULT_ERROR;
    }

    if (ok === false) {
        const {error} = body;

        return {
            error: error || DEFAULT_ERROR.error,
            ok,
            status,
        };
    }

    return {
        data: body.data,
        ok,
        status,
    };
};

export default request;
