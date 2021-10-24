import React from 'react';
import classnames from 'classnames';

import styles from './styles.module.scss';


const Space = ({
    className,
    size = 'md',
    direction = 'vertical',
}) => (
    <div
        className={classnames(
            className,
            styles[direction],
            styles[size],
        )}
        aria-hidden="true"
    />
);

export default Space;
