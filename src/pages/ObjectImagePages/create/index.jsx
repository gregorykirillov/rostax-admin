import React, {useCallback, useEffect} from 'react';
import {Button, Typography} from 'antd';
import {Redirect} from 'react-router-dom';

import {AdminForm, AdminInput} from '@/admin-lib/components';
import {useAdminData} from '@/admin-lib/hooks/useAdminData';
import {useQuery} from '@/hooks/useQuery';
import {Preloader} from '@/components';
import {ErrorMessage, Space} from '@/uikit';
import {useLoadFile} from '@/hooks/useLoadFile';
import {getApiRequestUrl} from '@/util/getApiRequestUrl';
import {getObjectImageShowPath} from '@/pages/ObjectImagePages/routes';
import {useMessages} from '@/hooks/useMessages';


const IMAGE_CREATE_VALIDATORS = {
    image: {required: true},
};

const ImageAdd = () => {
    const messages = useMessages();

    const {objectId, redirectTo} = useQuery();
    const {error, data} = useAdminData(getApiRequestUrl(`/object/${objectId}`));
    
    const {fileRef: picFileRef, name: pictureName, loading: isPicLoading, load: loadPic, error: picError} = useLoadFile();
    
    useEffect(() => {
        picError && messages.error('Не удалось загрузить картинку');
    }, [picError]);

    const handleSuccess = useCallback(
        () => messages.success('Картинка добавлена'),
        [messages],
    );

    const enhanceData = body => {
        body.set('objectId', objectId);
        pictureName && body.set('image', pictureName);

        return body;
    };

    if (!objectId) return <Redirect to={getObjectImageShowPath()} />;

    if (error) return <ErrorMessage>{error}</ErrorMessage>;
    if (!data) return <Preloader />;

    return (
        <AdminForm
            action={getApiRequestUrl('/objectImages')}
            method="POST"
            dataType="json"
            redirectTo={redirectTo}

            onError={messages.error}
            onSuccess={handleSuccess}
            enhanceDataBeforeSend={enhanceData}

            validators={IMAGE_CREATE_VALIDATORS}
        >
            <Typography>Добавление картинки для объекта #{data.object.name}</Typography>

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
                Подтвердить
            </Button>
        </AdminForm>
    );
};


export default ImageAdd;
