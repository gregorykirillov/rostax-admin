import {request} from '@util';
import {useContext} from 'react';
import {AdminContext} from '@components';

async function initUser() {
    const {setInitialized, setAuthenticated} = useContext(AdminContext);

    await request('/ping', {credentials: 'include'})
        .then(data => {
            setInitialized(true);
            data.ok && (setAuthenticated(true));
        });
}

export default initUser;
