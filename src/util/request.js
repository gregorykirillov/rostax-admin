import {SERVER_URL} from '@src/settings';

const DEFAULT_ERROR = {error: 'Неожиданная ошибка на сервере', ok: false, status: 500};

export const request = async (url, method, options=null) => {
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

        body = await res.json();
    } catch(e) {
        return DEFAULT_ERROR;
    }
    
    if (ok === false) {
        const {error} = body;

        return {
            error: error,
            ok,
            status,
        };
    }

    return {
        data: body,
        ok,
        status,
    };
};
