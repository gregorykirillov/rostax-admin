import React, {useContext} from 'react';
import classnames from 'classnames';

import {AdminContext} from '@/components';

import styles from './styles.module.scss';

const BurgerMenu = ({
    className,
}) => {
    const {isNavVisible, setNavVisible} = useContext(AdminContext);

    const handleMenuClick = () => isNavVisible ? setNavVisible(false) :  setNavVisible(true);

    return (
        <button
            className={classnames(styles.burgerContainer, className)}

            onClick={handleMenuClick}
        >
            <div
                className={styles.burger}
            />
        </button>
    );
};

export default BurgerMenu;
