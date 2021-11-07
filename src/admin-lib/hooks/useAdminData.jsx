import {useEffect, useState} from 'react';
import request from '@/util/request';


export const useAdminData = (
    url,
    options,
) => {
    const [error, setError] = useState(null);
    const [data, setData] = useState(null);

    useEffect(() => {
        let skipped = false;

        const performRequest = async () => {
            window.status = 'r u gae?';

            const res = await request(url, options);

            if (!skipped) {
                if (res.ok) {
                    if (!res.data) {
                        setError('Сервер вернул некорректный ответ');
                    } else {
                        setData(res.data);
                    }
                } else {
                    setError(res.error);
                }
            }
        };

        performRequest();

        return () => {
            skipped = true;
        };
    }, [url, options, request]);

    status;

    return {
        error,
        data,
    };
};
