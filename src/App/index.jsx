import React, {useEffect, useMemo, useState} from 'react';
import {unstable_batchedUpdates} from 'react-dom';
import {Switch, Redirect, Route} from 'react-router-dom';

import {AdminContext, Preloader} from '@/components';
import {Navigation, Header} from '@/parts';
import {LoginPage, CategoryPages, ProductPages} from '@/pages';
import {request} from '@/util/request';
import {getApiRequestUrl} from '@/util/getApiRequestUrl';
import AuthenticatedRoute from './AuthenticatedRoute';

import styles from './styles.module.scss';


const App = () => {
    const [isNavVisible, setNavVisible] = useState(false);
    const [isAuthenticated, setAuthenticated] = useState(false);
    const [initialized, setInitialized] = useState(false);

    useEffect(() => {
        const init = () => 
            request(getApiRequestUrl('/ping'), {credentials: 'include'})
                .then(data => {
                    unstable_batchedUpdates(() => {
                        setInitialized(true);
                        data.ok && (setAuthenticated(true));
                    });
                });

        init();
    }, []);

    const adminInfo = useMemo(
        () => ({isNavVisible, setNavVisible, isAuthenticated, setAuthenticated, initialized}),
        [isNavVisible, setNavVisible, isAuthenticated, setAuthenticated, initialized]
    );

    if (!initialized) return <Preloader />;

    return (
        <AdminContext.Provider value={adminInfo}>
            <Header />

            <div className={styles.appContainer}>
                <Navigation />

                <div className={styles.contentContainer}>
                    <Switch>
                        <Redirect exact from="/" to="/login" />

                        <AuthenticatedRoute
                            path="/categories"
                            component={CategoryPages}
                        />

                        <AuthenticatedRoute
                            path="/products"
                            component={ProductPages}
                        />

                        <Route path="/login"
                            component={LoginPage}    
                        />
                    </Switch>
                </div>
            </div>
        </AdminContext.Provider>
    );
};

export default App;
