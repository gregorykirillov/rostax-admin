import React, {useCallback, useEffect} from 'react';
import {useHistory, useParams} from 'react-router-dom';
import {Button, Typography} from 'antd';

import {AdminForm, AdminInput} from '@/admin-lib/components';
import {getApiRequestUrl} from '@/util/getApiRequestUrl';
import {useAdminData} from '@/admin-lib/hooks/useAdminData';
import {Preloader} from '@/components';
import {ErrorMessage, Space} from '@/uikit';
import {useMessages} from '@/hooks/useMessages';
import {useLoadFile} from '@/hooks/useLoadFile';

import {getProductsCategoryListPath} from '../routes';

import styles from '../../styles.module.scss';


const editPage = () => {
    const history = useHistory();
    const messages = useMessages();
    const {categoryId} = useParams();
    
    const {fileRef: picFileRef, name: pictureName, loading: isPicLoading, load: loadPic, error: picError} = useLoadFile();
    
    const {error, data} = useAdminData(getApiRequestUrl(`/category/${categoryId}`));
    
    useEffect(() => {
        picError && messages.error('Не удалось загрузить картинку');
    }, [picError]);

    const handleSuccess = useCallback(
        () => {
            messages.success('Категория успешно отредактирована');
            history.push(getProductsCategoryListPath());
        },
        [messages, history],
    );

    const enhanceData = body => {
        pictureName && body.set('image', pictureName);

        return body;
    };


    if (error) return <ErrorMessage>{error}</ErrorMessage>;
    if (!data) return <Preloader />;

    const {category} = data;

    return (
        <AdminForm
            action={getApiRequestUrl(`/category/${categoryId}`)}
            method="POST"
            dataType="json"

            onError={messages.error}
            onSuccess={handleSuccess}
            enhanceDataBeforeSend={enhanceData}
            className={styles.adminForm}
        >
            <Typography>Редактирование категории продуктов</Typography>

            <AdminInput
                defaultValue={category.name}
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

            <Space size='sm' />

            <Button
                type="primary"
                htmlType="submit"
                disabled={isPicLoading}
            >
                {'Сохранить'}
            </Button>
        </AdminForm>
    );
};

export default editPage;
