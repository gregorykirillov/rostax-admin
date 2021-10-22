import {useFormContext} from './useFormContext';


export const useValidationErrors = name => {
    const {errors} = useFormContext();

    return errors[name];
};
