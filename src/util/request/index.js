import {SERVER_URL} from '@src/settings';

const DEFAULT_ERROR = {error: 'Неожиданная ошибка на сервере', ok: false, status: 500};

const request = async (url, options, method) => {
    let ok = false;
    let body, status;

    try {
        const res = await fetch(SERVER_URL + url, 
            method == 'POST'
                ? {
                    credentials: 'include',
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json;'
                    },
                    body: JSON.stringify(options)
                }
                : options
        );

        ok = res.ok;
        status = res.status;
        try {
            body = await res.json();
            body = body?.data;
        }
        catch {
            true;
        }
    } catch(e) {
        return DEFAULT_ERROR;
    }

    return {
        data: body,
        ok,
        status,
    };
};

export default request;
