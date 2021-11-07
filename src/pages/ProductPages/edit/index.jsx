import React from 'react';
import {useParams} from 'react-router-dom';
import {Button} from 'antd';

import {AdminForm, AdminInput, AdminTextArea} from '@/admin-lib/components';
import {getApiRequestUrl} from '@/util/getApiRequestUrl';
import {useAdminData} from '@/admin-lib/hooks/useAdminData';
import {Preloader} from '@/components';
import {ErrorMessage} from '@/uikit';

import {getProductShowPath} from '../routes';


const PRODUCT_UPDATE_VALIDATORS = {
    name: {required: true},
    shortDescription: {required: true},
    price: {required: true},
};

const ProductEdit = () => {
    const {productId} = useParams();

    const {data, error} = useAdminData(getApiRequestUrl(`/product/${productId}`));

    if (error) return <ErrorMessage>{error}</ErrorMessage>;
    if (!data) return <Preloader />;

    const {product} = data;

    return (
        <AdminForm
            action={getApiRequestUrl(`/product/${productId}`)}
            dataType="multipart"
            method="PUT"
            validators={PRODUCT_UPDATE_VALIDATORS}
            redirectTo={getProductShowPath(product.id)}
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
            />

            <AdminInput
                labelText="Сертификат"
                name="certificate"
                type="file"
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
            >
                Подтвердить
            </Button>
        </AdminForm>
    );
};


export default ProductEdit;
