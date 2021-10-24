import React, {createContext} from 'react';

import {wrapDefaultContext} from '../util/wrapDefaultContext';


const DEFAULT_FORM_CONTEXT = wrapDefaultContext({
    isSubmitFailed: false,
    isFormDisabled: false,
    errors: {},
});
export const FormContext = createContext(DEFAULT_FORM_CONTEXT);


export const WithFormContext = ({children, ...value}) => (
    <FormContext.Provider value={value}>
        {children}
    </FormContext.Provider>
);
