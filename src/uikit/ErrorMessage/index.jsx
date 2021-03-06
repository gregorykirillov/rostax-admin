import React from 'react';

import styles from './styles.module.scss';


const ErrorMessage = ({children}) => (
    <p className={styles.errorMessage}>
        {children}
    </p>
);

export default ErrorMessage;
