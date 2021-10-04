import React, {useState} from 'react';
import {AdminContext} from '@components';
import Navigation from '@parts/Navigation';

const App = () => {
    const [isNavVisible, setNavVisible] = useState(false);

    return (
        <AdminContext.Provider value={{isNavVisible, setNavVisible}}>
            <Navigation />
        </AdminContext.Provider>
    );
};

export default App;
