import React, {useCallback, useEffect} from 'react';
import {Button, Typography} from 'antd';
import {Redirect} from 'react-router-dom';

import {AdminForm, AdminInput, AdminTextArea} from '@/admin-lib/components';
import {useAdminData} from '@/admin-lib/hooks/useAdminData';
import {useQuery} from '@/hooks/useQuery';
import {Preloader} from '@/components';
import {ErrorMessage, Space} from '@/uikit';
import {useLoadFile} from '@/hooks/useLoadFile';
import {getApiRequestUrl} from '@/util/getApiRequestUrl';
import {getProductsCategoryListPath} from '@/pages/CategoryPages/routes';
import {useMessages} from '@/hooks/useMessages';


const PRODUCT_CREATE_VALIDATORS = {
    name: {required: true},
    image: {required: true},
    certificate: {required: true},
    shortDescription: {required: true},
    price: {required: true},
};

const ProductCreate = () => {
    const messages = useMessages();

    const {categoryId, redirectTo} = useQuery();
    const {error, data} = useAdminData(getApiRequestUrl(`/category/${categoryId}`));
    
    const {fileRef: picFileRef, name: pictureName, loading: isPicLoading, load: loadPic, error: picError} = useLoadFile();
    const {fileRef: certFileRef, name: certName, loading: isCertLoading, load: loadCert, error: certError} = useLoadFile();
    
    useEffect(() => {
        picError && messages.error('Не удалось загрузить картинку');
    }, [picError]);
    useEffect(() => {
        certError && messages.error('Не удалось загрузить сертификат');
    }, [certError]);

    const handleSuccess = useCallback(
        ({product}) => messages.success(`Продукт ${product.name} создан`),
        [messages],
    );

    const enhanceData = body => {
        body.set('categoryId', categoryId);
        pictureName && body.set('image', pictureName);
        certName && body.set('certificate', certName);

        return body;
    };

    if (!categoryId) return <Redirect to={getProductsCategoryListPath()} />;

    if (error) return <ErrorMessage>{error}</ErrorMessage>;
    if (!data) return <Preloader />;

    const isLoading = isPicLoading || isCertLoading;

    return (
        <AdminForm
            action={getApiRequestUrl('/product')}
            method="POST"
            dataType="json"
            redirectTo={redirectTo}

            onError={messages.error}
            onSuccess={handleSuccess}
            enhanceDataBeforeSend={enhanceData}

            validators={PRODUCT_CREATE_VALIDATORS}
        >
            <Typography>Создание продукта для категории #{data.category.name}</Typography>

            <AdminInput
                labelText="Имя"
                name="name"
            />

            <AdminInput
                labelText="Картинка"
                name="image"
                type="file"
                $ref={picFileRef}
                onChange={e => loadPic(e.currentTarget.files[0])}
            />

            <AdminInput
                labelText="Сертификат"
                name="certificate"
                type="file"
                $ref={certFileRef}
                onChange={e => loadCert(e.currentTarget.files[0])}
            />

            <AdminTextArea
                labelText="Краткое описание"
                name="shortDescription"
            />

            <AdminTextArea
                labelText="Описание"
                name="description"
            />

            <AdminInput
                labelText="Цена"
                name="price"
            />

            <Space size='sm' />

            <Button
                type="primary"
                htmlType="submit"
                disabled={isLoading}
            >
                Подтвердить
            </Button>
        </AdminForm>
    );
};


export default ProductCreate;
