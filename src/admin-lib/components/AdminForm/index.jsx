import React, {useState} from 'react';
import {useHistory} from 'react-router-dom';

import {formDataToJson} from '@admin-lib/util/formDataToJson';
import {WithFormContext} from '@admin-lib/contexts/FormContext';
import {useFormErrors} from '@admin-lib/hooks/useFormErrors';
import request from '@util/request';

import {filterRequestParams} from './helpers/filterRequestParams';
import {getHeadersFromDataType} from './helpers/getHeadersFromDataType';
import {getFormErrors} from './helpers/getFormErrors';
import {getFormDataFromForm} from './helpers/getFormDataFromForm';
import {getApiRequestUrl} from '@util/getApiRequestUrl';


const AdminForm = ({
    action,
    method,
    children,
    dataType,

    redirectTo,
    className,

    onSuccess,
    onError,
    onSubmit,
    enhanceDataBeforeSend,
    defaultValues,

    requestParams={},
    validators,
}) => {
    const history = useHistory();
    const {errors, setErrors, clearErrors} = useFormErrors();
    const [isFormDisabled, setFormDisabled] = useState(false);

    const prepareBodyForSending = body => {
        const enhancedBody = enhanceDataBeforeSend ? enhanceDataBeforeSend(body) : body;
        const jsonBody = dataType === 'json' ? formDataToJson(enhancedBody) : enhancedBody;
        
        return jsonBody;
    };

    const performRequest = async data => {
        const body = prepareBodyForSending(data);
        const headers = getHeadersFromDataType(dataType);
        let newBody = {...defaultValues};

        const filteredParams = filterRequestParams(requestParams);

        setFormDisabled(true);

        if (body?.keys?.()) for (let key of body.keys()) {
            if (body.get(key)?.type?.includes('image')) {
                let tempBody = new FormData();
                tempBody.append('', body.get(key));
                const res = await request(
                    getApiRequestUrl('/image'),
                    {
                        method: 'POST',
                        headers,
                        body: tempBody,

                        ...filteredParams,
                    },
                );
                newBody[key] = res?.data?.fileName;
            } else newBody[key] = body.get(key);
        }
        
        const res = await request(
            action,
            {
                method,
                headers: headers || {'Content-Type': 'application/json'},
                body: JSON.stringify(newBody),
                credentials: 'include',

                ...filteredParams,
            },
        );

        setFormDisabled(false);

        if (!res.ok) {
            onError && onError(res.error);
        } else {
            onSuccess && onSuccess();
            redirectTo && history.replace(redirectTo);
        }
    };

    const handleSubmit = async e => {
        e.preventDefault();

        const body = getFormDataFromForm(e.currentTarget);
        onSubmit && onSubmit(body);

        const errors = validators ? getFormErrors(body, validators) : null;

        if (errors && Object.keys(errors).length) {
            setErrors(errors);
        } else {
            clearErrors();
            performRequest(body);
        }
    };

    return (
        <form
            className={className}
            onSubmit={handleSubmit}
        >
            <WithFormContext
                errors={errors}
                validators={validators}
                isFormDisabled={isFormDisabled}
                isSubmitFailed={false}
            >
                {children}
            </WithFormContext>
        </form>
    );
};


export default React.memo(AdminForm);
