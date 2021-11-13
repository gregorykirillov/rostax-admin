import React, {useCallback} from 'react';
import {Typography, Button} from 'antd';

import {AdminForm, AdminInput} from '@/admin-lib/components';
import {getApiRequestUrl} from '@/util/getApiRequestUrl';
import {useMessages} from '@/hooks/useMessages';

import {Space} from '@/uikit';
import {getObjectsListPath} from '../routes';


const OBJECT_FORM_VALIDATORS = {
    name: {
        required: true,
    },
};

const createPage = () => {
    const messages = useMessages();

    const handleSuccess = useCallback(
        () => messages.success('Объект создан'),
        [messages],
    );

    return (
        <AdminForm
            action={getApiRequestUrl('/object')}
            method="POST"
            dataType="json"
            redirectTo={getObjectsListPath()}

            onError={messages.error}
            onSuccess={handleSuccess}

            validators={OBJECT_FORM_VALIDATORS}
        >
            <Typography>Создание объекта</Typography>

            <AdminInput
                labelText="Имя"
                type="text"
                name="name"
            />

            <Space size='sm' />

            <Button
                type="primary"
                htmlType="submit"
            >
                {'Создать объект'}
            </Button>
            
        </AdminForm>
    );
};

export default createPage;
