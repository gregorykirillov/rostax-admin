import React, {useContext, useEffect, useState} from 'react';
import {useHistory} from 'react-router-dom';

import {Button, Input, Space} from 'antd';

import {AdminContext} from '@components';
import request from '@util/request';

function index() {
    const {isAuthenticated, setAuthenticated} = useContext(AdminContext);

    const [isLogging, setLogging] = useState(false);
    const [password, setPassword] = useState('');

    const history = useHistory();

    const login = async () => {
        setLogging(true);
    
        let res = await request('/login', {password}, 'POST');

        res.ok && setAuthenticated(true);

        setLogging(false);
    };

    useEffect(() => {
        isAuthenticated && history.push('/categories');
    }, [isAuthenticated]);


    return (
        <form
            onSubmit={e => {
                e.preventDefault();
                login();
            }}
        >
            <h1>Страница авторизации</h1>
            <Space direction="vertical">
                <Input 
                    disabled={isLogging}
                    onChange={e => setPassword(e.target.value)}
                />
                <Button 
                    htmlType="submit"
                    disabled={isLogging}
                >
                    Login
                </Button>
            </Space>
        </form>
    );
}

export default index;
