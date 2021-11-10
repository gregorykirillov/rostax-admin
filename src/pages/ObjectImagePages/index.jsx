import React from 'react';
import {Switch, Route} from 'react-router-dom';

import ImageAdd from './create';
import ObjectImageShow from './show';

const ObjectImagePages = () => (
    <Switch>
        <Route exact path={'/objectsImage/create'} component={ImageAdd} />
        <Route exact path={'/objectsImage/:objectImageId/show'} component={ObjectImageShow} />
    </Switch>
);


export default ObjectImagePages;
