import React, {useContext, useEffect} from 'react';
import {AdminContext} from '@components';
import {useHistory} from 'react-router-dom';

function index() {
    const {isAuthenticated, setAuthenticated} = useContext(AdminContext);
    const history = useHistory();

    useEffect(() => {
        isAuthenticated && history.push('/categories');
    }, [isAuthenticated]);

    const handleClick = () => setAuthenticated(true);

    return (
        <div>
            <h1 style={{marginBottom: '10px'}}>Страница авторизации</h1>
            <button 
                style={{border: '1px solid', padding: '5px 10px', borderRadius: '7px', cursor: 'pointer'}} 
                onClick={() => handleClick()}>Login</button>
        </div>
    );
}

export default index;
