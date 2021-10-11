import React from 'react';
import {Switch, Route} from 'react-router-dom';

import showPage from './show';

const ProductCategory = () => (
    <Switch>
        <Route exact path="/categories" component={showPage} />
    </Switch>
);

export default ProductCategory;
