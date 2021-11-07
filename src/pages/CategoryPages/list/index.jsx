import React, {useEffect, useState, useCallback} from 'react';
import {useHistory} from 'react-router-dom';
import {request} from '@/util/request';
import {getApiRequestUrl} from '@/util/getApiRequestUrl';
import {getProductsCategoryCreatePath, getProductsCategoryShowPath} from '../routes';
import {Button, Space} from 'antd';

import {DataTable} from '@/uikit';

const CATEGORY_FIELDS = [
    {name: 'Идентификатор', field: 'id'},
    {name: 'Имя', field: 'name'},
];

const listPage = () => {
    const [categories, setCategories] = useState([]);

    const getCategories = async() => {
        let {data} = await request(getApiRequestUrl('/category/all'));
        
        data.categories && setCategories(data.categories);
    };

    const history = useHistory();

    const rowSelectHandler = useCallback(
        (id) => history.push(getProductsCategoryShowPath(id)),
        [history],
    );

    useEffect(() => {
        getCategories();
    }, []);

    
    return (
        <>
            <h1>Категории продуктов</h1>
            <Space direction="vertical">
                <Button
                    onClick={() => history.push(getProductsCategoryCreatePath())}
                >
                    Добавить
                </Button>
                <DataTable
                    fields={CATEGORY_FIELDS}
                    handleRowSelect={rowSelectHandler}
                    dataList={categories}
                />
            </Space>
        </>
    );
};

export default listPage;
