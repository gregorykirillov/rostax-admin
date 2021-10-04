import React from 'react';

import {BurgerMenu} from './components';

import styles from './styles.module.scss';

const Header = () => (
    <header className={styles.header}>
        <div className={styles.headerContent}>
            <BurgerMenu/>
        </div>
    </header>
);

export default Header;
