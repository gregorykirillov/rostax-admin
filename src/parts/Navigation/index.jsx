import React, {useContext} from 'react';
import classnames from 'classnames';
import {Link} from 'react-router-dom';

import {CloseIcon} from './components';

import {AdminContext} from '@components';

import styles from '@parts/Navigation/styles.module.scss';


const Navigation = () => {
    const {isNavVisible, setNavVisible} = useContext(AdminContext);

    return (
        <div className={classnames(
            styles.navContainer,
            {[styles.opened]: isNavVisible},
        )}>
            <nav className={styles.nav}>
                <CloseIcon className={styles.closeIcon} />

                <Link to="/categories" onClick={() => setNavVisible(false)} className={styles.link}>Категории продуктов</Link>
            </nav>
        </div>
    );
};

export default Navigation;
