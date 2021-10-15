import React, {useEffect, useState, useCallback} from 'react';
import {useHistory} from 'react-router-dom';
import request from '@util/request';
import {Button, Space} from 'antd';

import {DataTable} from '@uikit';

const CATEGORY_FIELDS = [
    {name: 'Идентификатор', field: 'id'},
    {name: 'Имя', field: 'name'},
];

const showPage = () => {
    const [categories, setCategories] = useState([]);

    const getCategories = async() => {
        let {data} = await request('/category/all');
        
        data.categories && setCategories(data?.categories);
    };

    const history = useHistory();

    const rowSelectHandler = useCallback(
        (id) => history.push(`/categories/${id}/show`),
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
                    onClick={() => history.push('/categories/create')}
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

export default showPage;
