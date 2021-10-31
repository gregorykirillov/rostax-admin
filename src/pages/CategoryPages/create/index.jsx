import React, {useCallback} from 'react';
import {Typography, Button} from 'antd';

import {AdminForm, AdminInput} from '@admin-lib/components';
import {getApiRequestUrl} from '@util/getApiRequestUrl';
import {useMessages} from '@hooks/useMessages';

import {Space} from '@uikit';
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
            action={getApiRequestUrl('/category')}
            method="POST"
            dataType="multipart"
            redirectTo={'/categories'} // Добавить getProductsCategoryListPath
            validators={CATEGORY_FORM_VALIDATORS}
            onError={messages.error}
            className={styles.adminForm}
            onSuccess={handleSuccess}
        >
            <Typography>Создание категории продуктов</Typography>

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

            <Space size='sm'/>

            <Button
                type="primary"
                htmlType="submit"
            >
                {'Создать категорию'}
            </Button>
            
        </AdminForm>
    );
};

export default createPage;
