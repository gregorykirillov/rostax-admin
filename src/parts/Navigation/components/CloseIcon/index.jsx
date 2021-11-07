import React, {useContext} from 'react';

import classnames from 'classnames';

import {CloseCircleOutlined} from '@ant-design/icons';
import {AdminContext} from '@/components';

const CloseIcon = ({
    className
}) => {
    const {setNavVisible} = useContext(AdminContext);

    return (
        <>
            <button
                className={classnames(
                    className,
                )}
                onClick={() => setNavVisible(false)}
            >
                <CloseCircleOutlined />
            </button>
        </>
    );
};

export default CloseIcon;
