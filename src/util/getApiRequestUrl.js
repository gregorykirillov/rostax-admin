import {stringify as stringifyQs} from 'query-string';
import {SERVER_URL} from '@/settings';


export const getApiRequestUrl = (path, params={}) =>
    `${SERVER_URL}${path}?${stringifyQs(params)}`;
