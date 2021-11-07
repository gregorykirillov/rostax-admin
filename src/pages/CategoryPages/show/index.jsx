import React from 'react';
import {useHistory, useLocation, useParams} from 'react-router-dom';
import {Button, Typography, Space as SpaceContainer} from 'antd';

import {useAdminData} from '@/admin-lib/hooks/useAdminData';
import {Preloader, DeleteBtn} from '@/components';
import {DescriptionTable, ErrorMessage, Space} from '@/uikit';
import {getImageUrl} from '@/util/getImageUrl';
import {getProductCreatePath} from '@/pages/ProductPages/routes';
import {useMessages} from '@/hooks/useMessages';

import {CategoryProducts} from '../parts';
import {getProductsCategoryEditPath, getProductsCategoryListPath} from '../routes';
import {getApiRequestUrl} from '@/util/getApiRequestUrl';


const showPage = () => {
    const history = useHistory();
    const location = useLocation();
    const messages = useMessages();

    const {categoryId} = useParams();
    const {error, data} = useAdminData(getApiRequestUrl(`/category/${categoryId}`));

    if (error) return <ErrorMessage>{error}</ErrorMessage>;
    if (!data) return <Preloader />;

    return (
        <>
            <Typography.Title level={3}>
                {`Категория "${data.category.name}"`}
            </Typography.Title>

            <SpaceContainer direction="horizontal">
                <Button
                    type="primary"
                    onClick={() => history.push(getProductsCategoryEditPath(data.category.id))}
                >
                    {'Редактировать'}
                </Button>

                <Button
                    type="primary"
                    onClick={() => history.push(getProductCreatePath(data.category.id, location.pathname))}
                >
                    {'Добавить продукт'}
                </Button>

                <DeleteBtn
                    url={getApiRequestUrl(`/category/${categoryId}`)}
                    confirmationMessage={'Вы точно хотите удалить категорию?'}

                    handleSuccess={() => {
                        history.push(getProductsCategoryListPath());
                        messages.success('Категория удалена');
                    }}
                    handleError={() => messages.error('Не удалось удалить категорию')}
                >
                    {'Удалить'}
                </DeleteBtn>
            </SpaceContainer>

            <DescriptionTable>
                <DescriptionTable.Item
                    name={'Идентификатор'}
                    value={data.category.id}
                />
                <DescriptionTable.Item
                    name={'Имя'}
                    value={data.category.name}
                />
                <DescriptionTable.Item
                    name={'Картинка'}
                    value={<img height={120} src={getImageUrl(data.category.image)} />}
                />
            </DescriptionTable>

            <Space />

            <Typography.Title level={3}>Продукты</Typography.Title>
            <CategoryProducts />
        </>
    );
};

export default showPage;
