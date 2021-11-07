import React, {useContext, useEffect} from 'react';
import {Route, useHistory} from 'react-router-dom';

import {AdminContext} from '@/components';
import {getLoginPagePath} from '@/pages/LoginPage/routes';

const AuthenticatedRoute = props => {
    const {isAuthenticated} = useContext(AdminContext);
    const history = useHistory();

    useEffect(() => !isAuthenticated && history.push(getLoginPagePath()), [history, isAuthenticated]);

    if (!isAuthenticated) return <Route />;

    return <Route {...props} />;
};


export default AuthenticatedRoute;
