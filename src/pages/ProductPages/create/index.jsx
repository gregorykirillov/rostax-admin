import React, {useCallback, /*useMemo*/} from 'react';
import {Button, Typography} from 'antd';
import {Redirect} from 'react-router-dom';

import {AdminForm, AdminInput, AdminTextArea} from '@admin-lib/components';
import {useAdminData} from '@admin-lib/hooks/useAdminData';
import {useQuery} from '@hooks/useQuery';
import {Preloader} from '@components';
import {ErrorMessage, Space} from '@uikit';
import {getApiRequestUrl} from '@util/getApiRequestUrl';
import {getProductsCategoryListPath} from '@pages/CategoryPages/routes';
import {useMessages} from '@hooks/useMessages';


const PRODUCT_CREATE_VALIDATORS = {
    name: {required: true},
    image: {required: true},
    certificate: {required: true},
    shortDescription: {required: true},
    price: {required: true},
};

const ProductCreate = () => {
    const {categoryId, redirectTo} = useQuery();
    const {error, data} = useAdminData(getApiRequestUrl(`/category/${categoryId}`));

    const messages = useMessages();

    const handleSuccess = useCallback(
        () => messages.success(''),
        [messages],
    );

    if (!categoryId) return <Redirect to={getProductsCategoryListPath()} />;

    if (error) return <ErrorMessage>{error}</ErrorMessage>;
    if (!data) return <Preloader />;

    return (
        <AdminForm
            action={getApiRequestUrl(`/product/${categoryId}`)}
            method="POST"
            dataType="multipart"
            redirectTo={redirectTo}

            onError={messages.error}
            onSuccess={handleSuccess}

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
            />

            <AdminInput
                labelText="Сертификат"
                name="certificate"
                type="file"
            />

            <AdminInput
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

            <Space />

            <Button
                type="primary"
                htmlType="submit"
            >
                Подтвердить
            </Button>
        </AdminForm>
    );
};


export default ProductCreate;
