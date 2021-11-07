import React, {useCallback, useEffect} from 'react';
import {useHistory, useParams} from 'react-router-dom';
import {Button, Typography} from 'antd';

import {AdminForm, AdminInput} from '@/admin-lib/components';
import {useAdminData} from '@/admin-lib/hooks/useAdminData';
import {Preloader} from '@/components';
import {ErrorMessage, Space} from '@/uikit';
import {useMessages} from '@/hooks/useMessages';
import {getApiRequestUrl} from '@/util/getApiRequestUrl';

import {getProductsCategoryListPath} from '../routes';

import styles from '../../styles.module.scss';


const editPage = () => {
    const history = useHistory();
    const messages = useMessages();
    const {categoryId} = useParams();
    
    const {error, data} = useAdminData(getApiRequestUrl(`/category/${categoryId}`));

    const handleSuccess = useCallback(
        () => {
            messages.success('Категория успешно отредактирована');
            history.push(getProductsCategoryListPath());
        },
        [messages, history],
    );

    useEffect(() => {
        error && messages.error(error);
    }, [error, messages]);

    if (error) return <ErrorMessage>{error}</ErrorMessage>;
    if (!data) return <Preloader />;

    return (
        <AdminForm
            action={getApiRequestUrl(`/category/${categoryId}`)}
            method="POST"
            dataType="multipart"
            onError={messages.error}
            className={styles.adminForm}

            onSuccess={handleSuccess}
        >
            <Typography>Редактирование категории продуктов</Typography>

            <AdminInput
                defaultValue={data.name}
                labelText="Имя"
                type="text"
                name="name"
            />

            <AdminInput
                labelText="Картинка"
                type="file"
                name="image"
            />

            <Space size='sm' />

            <Button
                type="primary"
                htmlType="submit"
            >
                {'Сохранить'}
            </Button>
        </AdminForm>
    );
};

export default editPage;
