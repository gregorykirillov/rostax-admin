import React from 'react';
import {useHistory, useParams} from 'react-router-dom';
import {Button, Typography, Space as SpaceContainer} from 'antd';

import {useAdminData} from '@/admin-lib/hooks/useAdminData';
import {Preloader, DeleteBtn} from '@/components';
import {DescriptionTable, ErrorMessage, Space} from '@/uikit';
import {useMessages} from '@/hooks/useMessages';

import {ObjectImages} from '../parts';
import {getObjectsEditPath, getObjectsListPath} from '../routes';
import {getApiRequestUrl} from '@/util/getApiRequestUrl';
import {getObjectImageCreatePath} from '@/pages/ObjectImagePages/routes';


const showPage = () => {
    const history = useHistory();
    const messages = useMessages();

    const {objectId} = useParams();
    const {error, data} = useAdminData(getApiRequestUrl(`/object/${objectId}`));

    if (error) return <ErrorMessage>{error}</ErrorMessage>;
    if (!data) return <Preloader />;

    return (
        <>
            <Typography.Title level={3}>
                {`Объект "${data.object.name}"`}
            </Typography.Title>

            <SpaceContainer direction="horizontal" wrap>
                <Button
                    type="primary"
                    onClick={() => history.push(getObjectsEditPath(data.object.id))}
                >
                    {'Редактировать'}
                </Button>

                <Button
                    type="primary"
                    onClick={() => history.push(getObjectImageCreatePath(data.object.id, location.pathname))}
                >
                    {'Добавить картинку'}
                </Button>

                <DeleteBtn
                    url={getApiRequestUrl(`/object/${objectId}`)}
                    confirmationMessage={'Вы точно хотите удалить объект?'}

                    handleSuccess={() => {
                        history.push(getObjectsListPath());
                        messages.success('Объект удалён');
                    }}
                    handleError={() => messages.error('Не удалось удалить объект')}
                >
                    {'Удалить'}
                </DeleteBtn>
            </SpaceContainer>

            <DescriptionTable>
                <DescriptionTable.Item
                    name={'Идентификатор'}
                    value={data.object.id}
                />
                <DescriptionTable.Item
                    name={'Имя'}
                    value={data.object.name}
                />
            </DescriptionTable>

            <Space />

            <Typography.Title level={3}>Объекты</Typography.Title>
            <ObjectImages />
        </>
    );
};

export default showPage;
