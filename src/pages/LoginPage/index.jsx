import React, {useContext, useEffect, useState} from 'react';
import {AdminContext} from '@components';
import {useHistory} from 'react-router-dom';
import {Button, Input, Space} from 'antd';


function index() {
    const {isAuthenticated, setAuthenticated} = useContext(AdminContext);
    
    const [isLogging, setLogging] = useState(false);
    const [password, setPassword] = useState('');

    const history = useHistory();

    const handleLogin = () => {
        setLogging(true);
        
        setTimeout(() => {
            setLogging(false);
            password == '1'
                ? (setAuthenticated(true))
                : (alert('Wrong password'));
        }, 700);
    };

    useEffect(() => {
        isAuthenticated && history.push('/categories');
    }, [isAuthenticated]);


    return (
        <form
            onSubmit={e => {
                e.preventDefault();
                handleLogin(e);
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
