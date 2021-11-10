import React, {useCallback, useEffect} from 'react';
import {useParams} from 'react-router-dom';
import {Button} from 'antd';

import {AdminForm, AdminInput, AdminTextArea} from '@/admin-lib/components';
import {getApiRequestUrl} from '@/util/getApiRequestUrl';
import {useAdminData} from '@/admin-lib/hooks/useAdminData';
import {Preloader} from '@/components';
import {ErrorMessage} from '@/uikit';
import {useLoadFile} from '@/hooks/useLoadFile';

import {getProductShowPath} from '../routes';
import {useMessages} from '@/hooks/useMessages';


const PRODUCT_UPDATE_VALIDATORS = {
    name: {required: true},
    shortDescription: {required: true},
    price: {required: true},
};

const ProductEdit = () => {
    const messages = useMessages();
    const {productId} = useParams();

    const {data, error} = useAdminData(getApiRequestUrl(`/product/${productId}`));
    
    const {fileRef: picFileRef, name: pictureName, loading: isPicLoading, load: loadPic, error: picError} = useLoadFile();
    const {fileRef: certFileRef, name: certName, loading: isCertLoading, load: loadCert, error: certError} = useLoadFile();
    
    useEffect(() => {
        picError && messages.error('Не удалось загрузить картинку');
    }, [picError]);
    useEffect(() => {
        certError && messages.error('Не удалось загрузить сертификат');
    }, [certError]);

    const handleSuccess = useCallback(
        (data) => messages.success(`Продукт ${data} отредактрован`),
        [messages],
    );

    const enhanceData = body => {
        pictureName && body.set('image', pictureName);
        certName && body.set('certificate', certName);

        return body;
    };

    if (error) return <ErrorMessage>{error}</ErrorMessage>;
    if (!data) return <Preloader />;

    const isLoading = isPicLoading || isCertLoading;

    const {product} = data;

    return (
        <AdminForm
            action={getApiRequestUrl(`/product/${productId}`)}
            method="PUT"
            dataType="json"
            redirectTo={getProductShowPath(product.id)}

            onError={messages.error}
            onSuccess={handleSuccess}
            enhanceDataBeforeSend={enhanceData}

            validators={PRODUCT_UPDATE_VALIDATORS}
        >
            <AdminInput
                labelText="Имя"
                name="name"
                defaultValue={product.name}
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
                defaultValue={product.shortDescription}
            />

            <AdminTextArea
                labelText="Описание"
                name="description"
                defaultValue={product.description}
            />

            <AdminInput
                labelText="Цена"
                name="price"
                defaultValue={product.price}
            />


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


export default ProductEdit;
