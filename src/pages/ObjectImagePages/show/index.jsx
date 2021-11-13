import React from 'react';
import {useHistory, useParams} from 'react-router-dom';
import {Typography, Space} from 'antd';

import {useAdminData} from '@/admin-lib/hooks/useAdminData';
import {DeleteBtn, Preloader} from '@/components';
import {DescriptionTable} from '@/uikit';
import {getApiRequestUrl} from '@/util/getApiRequestUrl';
import {getImageUrl} from '@/util/getImageUrl';
import {useMessages} from '@/hooks/useMessages';

import {getObjectsShowPath} from '@/pages/ObjectPages/routes';


const ObjectImageShow = () => {
    const objectImageId = useParams().objectImageId;
    const {data, error} = useAdminData(getApiRequestUrl(`/objectImages/${objectImageId}`));

    const history = useHistory();
    const messages = useMessages();

    if (error) return <p>{error}</p>;
    if (!data) return <Preloader />;

    const {objectImage} = data;

    return (
        <DescriptionTable>
            <Typography.Title level={3}>
                {`Картинка "${objectImage.image}"`}
            </Typography.Title>

            <Space direction="horizontal">
                <DeleteBtn
                    url={getApiRequestUrl(`/objectImages/${objectImage.id}`)}

                    confirmationMessage="Вы точно хотите удалить картинку?"
                    handleSuccess={() => {
                        history.push(getObjectsShowPath(objectImage.objectId));
                        messages.success('Картинка успешно удалена');
                    }}
                    handleError={() => messages.error('Не удалось удалить картинку')}
                >
                    Удалить картинку
                </DeleteBtn>
            </Space>

            <DescriptionTable.Item
                name="Id"
                value={objectImage.id}
            />

            <DescriptionTable.Item
                name="Картинка"
                value={<img height={120} src={getImageUrl(objectImage.image)} />}
            />

        </DescriptionTable>
    );
};

export default ObjectImageShow;
