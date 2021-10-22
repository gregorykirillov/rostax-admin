import {useFormContext} from './useFormContext';


export const useFieldValidators = fieldName => {
    const {validators} = useFormContext();

    if (validators) {
        return validators[fieldName];
    }
};
