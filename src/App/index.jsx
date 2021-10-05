import React, {useState} from 'react';
import {Switch, Redirect, Route} from 'react-router-dom';
import {AdminContext} from '@components';
import {Navigation, Header} from '@parts';
import AuthenticatedRoute from './AuthenticatedRoute';
import {CategoryPages, LoginPage} from '@pages';

import styles from './styles.module.scss';

const App = () => {
    const [isNavVisible, setNavVisible] = useState(false);
    const [isAuthenticated, setAuthenticated] = useState(false);

    return (
        <AdminContext.Provider value={{isNavVisible, setNavVisible, isAuthenticated, setAuthenticated}}>
            <Header />

            <div className={styles.appContainer}>
                <Navigation />

                <div className={styles.contentContainer}>
                    <Switch>
                        <Redirect exact from="/" to="/categories" />

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
