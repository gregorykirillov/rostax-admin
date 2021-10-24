import {SERVER_URL} from '@src/settings';

const DEFAULT_ERROR = {error: 'Неожиданная ошибка на сервере', status: 500};

const request = async (url, options, method) => {
    let body;

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

        try {
            body = await res.json();
            body = body?.data;
        }
        catch(e) {
            true;
        }
        return {
            data: body,
            ok: res.ok,
            status: res.status,
        };

    } catch(e) {
        return DEFAULT_ERROR;
    }
};

export default request;
