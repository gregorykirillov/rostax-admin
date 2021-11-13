import React, {useEffect, useState, useCallback} from 'react';
import {useHistory} from 'react-router-dom';
import {request} from '@/util/request';
import {getApiRequestUrl} from '@/util/getApiRequestUrl';
import {getObjectsShowPath, getObjectsCreatePath} from '../routes';
import {Button, Space} from 'antd';

import {DataTable} from '@/uikit';

const OBJECT_FIELDS = [
    {name: 'Идентификатор', field: 'id'},
    {name: 'Имя', field: 'name'},
];

const listPage = () => {
    const [objects, setObjects] = useState([]);

    const getObjects = async() => {
        let {data} = await request(getApiRequestUrl('/object/all'));
        
        data.objects && setObjects(data.objects);
    };

    const history = useHistory();

    const rowSelectHandler = useCallback(
        (id) => history.push(getObjectsShowPath(id)),
        [history],
    );

    useEffect(() => {
        getObjects();
    }, []);

    
    return (
        <>
            <h1>Объекты</h1>
            <Space direction="vertical">
                <Button
                    onClick={() => history.push(getObjectsCreatePath())}
                >
                    Добавить
                </Button>
                <DataTable
                    fields={OBJECT_FIELDS}
                    handleRowSelect={rowSelectHandler}
                    dataList={objects}
                />
            </Space>
        </>
    );
};

export default listPage;
