import React, {useMemo} from 'react';
import {useHistory, useParams} from 'react-router-dom';

import {useAdminData} from '@admin-lib/hooks/useAdminData';
import {Preloader} from '@components';
import {DataTable, ErrorMessage} from '@uikit';
import {getProductShowPath} from '@pages/ProductPages/routes';
import {getApiRequestUrl} from '@util/getApiRequestUrl';


const TABLE_FIELDS = [
    {name: 'Идентификатор', field: 'id'},
    {name: 'Имя', field: 'name'},
];

const CategoryProducts = () => {
    const parentId = +useParams().categoryId;
    const {data, error} = useAdminData(getApiRequestUrl('/product/all'));

    const history = useHistory();

    const filteredProducts = useMemo(() => {
        if (data) {
            return data.products.filter(
                ({categoryId}) => categoryId === parentId,
            );
        }

        return [];
    }, [data, parentId]);

    if (error) return <ErrorMessage>{error}</ErrorMessage>;
    if (!data) return <Preloader />;

    return (
        <DataTable
            fields={TABLE_FIELDS}
            dataList={filteredProducts}
            handleRowSelect={id => history.push(getProductShowPath(id))}
        />
    );
};


export default CategoryProducts;
