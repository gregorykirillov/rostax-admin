import React, {useCallback} from 'react';
import {Typography, Button} from 'antd';

import {AdminForm, AdminInput} from '@admin-lib/components';
import {useMessages} from '@hooks/useMessages';

import styles from '../../styles.module.scss';


const CATEGORY_FORM_VALIDATORS = {
    name: {
        required: true,
    },
    image: {
        required: true,
    },
};

const createPage = () => {
    const messages = useMessages();

    const handleSuccess = useCallback(
        () => {
            messages.success('Категория успешно создана');
        },
        [messages],
    );

    return (
        <AdminForm
            action={['/image', '/category']}
            method="POST"
            dataType="multipart"
            redirectTo={'/categories'}
            validators={CATEGORY_FORM_VALIDATORS}
            onError={messages.error}
            className={styles.adminForm}
            onSuccess={handleSuccess}
        >
            <Typography >Создание категории продуктов</Typography>

            <AdminInput
                labelText="Имя"
                type="text"
                name="name"
            />

            <AdminInput
                labelText="Картинка"
                type="file"
                name="image"
            />
            <Button
                type="primary"
                htmlType="submit"
                className={styles.submit}
            >
                {'Создать категорию'}
            </Button>
            
        </AdminForm>
    );
};

export default createPage;
