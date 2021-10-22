import React from 'react';
import classnames from 'classnames';

import styles from './styles.module.scss';



const DescriptionItem = ({name, value}) => (
    <li className={styles.descriptionItem}>
        <div>{name}: </div>
        <div>{value}</div>
    </li>
);

const DescriptionTable = ({tableClassName, children}) => (
    <ul className={classnames(tableClassName, styles.description)}>
        {children}
    </ul>
);

DescriptionTable.Item = DescriptionItem;


export default DescriptionTable;
