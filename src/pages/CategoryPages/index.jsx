import React from 'react';
import {Switch, Route} from 'react-router-dom';

import listPage from './list';
import createPage from './create';
import showPage from './show';
import editPage from './edit';

const ProductCategory = () => (
    <Switch>
        <Route exact path="/categories" component={listPage} />
        <Route exact path="/categories/create" component={createPage} />
        <Route exact path="/categories/:categoryId/show" component={showPage} />
        <Route exact path="/categories/:categoryId/edit" component={editPage} />
    </Switch>
);

export default ProductCategory;
