import React, {useEffect, useState} from 'react';
import {Switch, Redirect, Route} from 'react-router-dom';

import {AdminContext, Preloader} from '@components';
import {Navigation, Header} from '@parts';
import {CategoryPages, LoginPage} from '@pages';
import {request} from '@util';
import AuthenticatedRoute from './AuthenticatedRoute';

import styles from './styles.module.scss';


const App = () => {
    const [isNavVisible, setNavVisible] = useState(false);
    const [isAuthenticated, setAuthenticated] = useState(false);
    const [initialized, setInitialized] = useState(false);

    const init = async() => {
        await request('/ping', {credentials: 'include'})
            .then(data => {
                setInitialized(true);
                data.ok && (setAuthenticated(true));
            });
    };
    useEffect(() => init(), []);

    if (!initialized) return <Preloader />;

    return (
        <AdminContext.Provider value={{isNavVisible, setNavVisible, isAuthenticated, setAuthenticated, initialized, setInitialized}}>
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
