import React, {useContext, useEffect, useState} from 'react';
import {useHistory} from 'react-router-dom';
import {useMessages} from '@hooks/useMessages';

import {Button, Input, message, Space} from 'antd';

import {AdminContext} from '@components';
import request from '@util/request';

function index() {
    const {isAuthenticated, setAuthenticated} = useContext(AdminContext);

    const [isLogging, setLogging] = useState(false);
    const [password, setPassword] = useState('');

    const history = useHistory();
    
    const messages = useMessages();

    const login = async () => {
        setLogging(true);
    
        let res = await request('/login', {password}, 'POST');

        switch(res.status) {
        case 200:
            setAuthenticated(true);
            message.success('Успешная авторизация');
            break;
        case 400:
            messages.error('Неверный пароль');
            break;
        default:
            messages.error(`Неизвестная ошибка. Код ошибки: ${res.status}`);
        }

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
