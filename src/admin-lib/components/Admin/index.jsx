import React from 'react';

import {RequestsContext} from '@/admin-lib/contexts/RequestsContext';


const Admin = ({
    requestProvider,
    children,
}) => (
    <RequestsContext.Provider value={requestProvider}>
        {children}
    </RequestsContext.Provider>
);


export default Admin;
