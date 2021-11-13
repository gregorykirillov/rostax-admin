import React from 'react';
import {Switch, Route} from 'react-router-dom';

import listPage from './list';
import createPage from './create';
import showPage from './show';
import editPage from './edit';

const ObjectPages = () => (
    <Switch>
        <Route exact path="/objects" component={listPage} />
        <Route exact path="/objects/create" component={createPage} />
        <Route exact path="/objects/:objectId/show" component={showPage} />
        <Route exact path="/objects/:objectId/edit" component={editPage} />
    </Switch>
);

export default ObjectPages;
