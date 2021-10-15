import React from 'react';
import classnames from 'classnames';

import styles from './styles.module.scss';


const Preloader = ({
    className,
}) => (
    <div className={classnames(styles.preloaderContainer, className)}>
        <div className={styles.preloader}></div>
    </div>
);

export default Preloader;
