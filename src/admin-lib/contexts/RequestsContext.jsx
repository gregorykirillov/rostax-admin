import {createContext} from 'react';


const defaultHandler = () => {throw new Error('Не определён авторизационный контекст');};

const DEFAULT_REQUESTS_CONTEXT = {
    request: defaultHandler,
};


export const RequestsContext = createContext(DEFAULT_REQUESTS_CONTEXT);
