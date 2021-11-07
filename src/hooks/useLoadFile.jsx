import {useRef, useState, useEffect, useCallback} from 'react';

import {request} from '@/util/request';
import {getApiRequestUrl} from '@/util/getApiRequestUrl';


export const useLoadFile = () => {
    const fileRef = useRef(null);
    const abortController = useRef(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [fileName, setFileName] = useState(null);
    
    useEffect(() => () => abortController?.abort?.());
    
    const reset = useCallback(() => {
        setLoading(true);
        setError(null);
        setFileName(null);
    }, []);

    const handleLoad = file => {
        if (!file) {
            reset();
            return;
        }
        if (abortController.current) abortController.current.abort();
    
        const formData = new FormData();
        formData.append('image', file);
    
        const controller = new AbortController();
        abortController.current = controller;
    
        const {signal} = controller;
    
        reset();
        
        return request(getApiRequestUrl('/image'), {method: 'POST', body: formData}).then(res => {
            if (signal.aborted) return;
    
            if (!res.ok) {
                fileRef.current.value = null;
                setError(res.error);
            } else {
                const {data: {fileName}} = res;
    
                setFileName(fileName);
            }
    
            abortController.current = null;
            setLoading(false);
        });
    };

    return {name: fileName, fileRef, error, loading, load: handleLoad};
};

