import React, {useCallback, useEffect} from 'react';
import {Typography, Button} from 'antd';

import {AdminForm, AdminInput} from '@/admin-lib/components';
import {getApiRequestUrl} from '@/util/getApiRequestUrl';
import {useMessages} from '@/hooks/useMessages';
import {useLoadFile} from '@/hooks/useLoadFile';

import {Space} from '@/uikit';
import styles from '../../styles.module.scss';
import {getProductsCategoryListPath} from '../routes';


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

    const {fileRef: picFileRef, name: pictureName, loading: isPicLoading, load: loadPic, error: picError} = useLoadFile();
    
    useEffect(() => {
        picError && messages.error('Не удалось загрузить картинку');
    }, [picError]);

    const handleSuccess = useCallback(
        ({category}) => messages.success(`Категория ${category.name} создана`),
        [messages],
    );

    const enhanceData = body => {
        pictureName && body.set('image', pictureName);

        return body;
    };

    return (
        <AdminForm
            action={getApiRequestUrl('/category')}
            method="POST"
            dataType="json"
            redirectTo={getProductsCategoryListPath()}

            onError={messages.error}
            onSuccess={handleSuccess}
            enhanceDataBeforeSend={enhanceData}

            className={styles.adminForm}
            validators={CATEGORY_FORM_VALIDATORS}
        >
            <Typography>Создание категории продуктов</Typography>

            <AdminInput
                labelText="Имя"
                type="text"
                name="name"
            />

            <AdminInput
                labelText="Картинка"
                name="image"
                type="file"
                $ref={picFileRef}
                onChange={e => loadPic(e.currentTarget.files[0])}
            />

            <Space size='sm'/>

            <Button
                type="primary"
                htmlType="submit"
                disabled={isPicLoading}
            >
                {'Создать категорию'}
            </Button>
            
        </AdminForm>
    );
};

export default createPage;
