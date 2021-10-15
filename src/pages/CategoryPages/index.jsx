import React from 'react';
import {Switch, Route} from 'react-router-dom';

import showPage from './list';

const ProductCategory = () => (
    <Switch>
        <Route exact path="/categories" component={showPage} />
    </Switch>
);

export default ProductCategory;
