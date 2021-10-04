import React, {useContext} from 'react';
import classnames from 'classnames';
import {Link} from 'react-router-dom';

import {CloseIcon} from './components';
import {Header} from '@parts';

import {AdminContext} from '@components';

import styles from '@parts/Navigation/styles.module.scss';


const Navigation = () => {
    const {isNavVisible} = useContext(AdminContext);

    return (
        <div className={classnames(
            styles.navContainer,
            {[styles.opened]: isNavVisible},
        )}>
            <Header />
            <nav className={styles.nav}>
                <CloseIcon className={styles.closeIcon} />

                <Link to="/categories" className={styles.link}>Категории продуктов</Link>
            </nav>
        </div>
    );
};

export default Navigation;
