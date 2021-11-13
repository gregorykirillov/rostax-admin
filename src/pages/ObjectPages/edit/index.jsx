import React, {useCallback} from 'react';
import {useHistory, useParams} from 'react-router-dom';
import {Button, Typography} from 'antd';

import {AdminForm, AdminInput} from '@/admin-lib/components';
import {getApiRequestUrl} from '@/util/getApiRequestUrl';
import {useAdminData} from '@/admin-lib/hooks/useAdminData';
import {Preloader} from '@/components';
import {ErrorMessage, Space} from '@/uikit';
import {useMessages} from '@/hooks/useMessages';

import {getObjectsListPath} from '../routes';


const editPage = () => {
    const history = useHistory();
    const messages = useMessages();
    const {objectId} = useParams();
    
    const {error, data} = useAdminData(getApiRequestUrl(`/object/${objectId}`));

    const handleSuccess = useCallback(
        () => {
            messages.success('Объект успешно отредактирован');
            history.push(getObjectsListPath());
        },
        [messages, history],
    );


    if (error) return <ErrorMessage>{error}</ErrorMessage>;
    if (!data) return <Preloader />;

    const {object} = data;

    return (
        <AdminForm
            action={getApiRequestUrl(`/object/${objectId}`)}
            method="POST"
            dataType="json"

            onError={messages.error}
            onSuccess={handleSuccess}
        >
            <Typography>Редактирование объекта</Typography>

            <AdminInput
                defaultValue={object.name}
                labelText="Имя"
                type="text"
                name="name"
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
