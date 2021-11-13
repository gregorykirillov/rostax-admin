import React, {useMemo} from 'react';
import {useHistory, useParams} from 'react-router-dom';

import {useAdminData} from '@/admin-lib/hooks/useAdminData';
import {Preloader} from '@/components';
import {DataTable, ErrorMessage} from '@/uikit';
import {getObjectImageShowPath} from '@/pages/ObjectImagePages/routes';
import {getApiRequestUrl} from '@/util/getApiRequestUrl';


const TABLE_FIELDS = [
    {name: 'Идентификатор', field: 'id'},
    {name: 'Имя', field: 'image'},
];

const ObjectImages = () => {
    const parentId = +useParams().objectId;
    const {data, error} = useAdminData(getApiRequestUrl('/objectImages/all'));

    const history = useHistory();

    const filteredObjects = useMemo(() => {
        if (data) {
            return data.objectImages.filter(
                ({objectId}) => objectId === parentId,
            );
        }

        return [];
    }, [data, parentId]);

    if (error) return <ErrorMessage>{error}</ErrorMessage>;
    if (!data) return <Preloader />;

    return (
        <DataTable
            fields={TABLE_FIELDS}
            dataList={filteredObjects}
            handleRowSelect={id => history.push(getObjectImageShowPath(id))}
        />
    );
};


export default ObjectImages;
