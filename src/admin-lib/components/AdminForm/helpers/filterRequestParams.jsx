import {omit} from 'ramda';

const OMITTED_INIT_PARAMS = ['body', 'method'];


export const filterRequestParams = params =>
    omit(OMITTED_INIT_PARAMS, params);
