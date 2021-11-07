import React from 'react';
import {render} from 'react-dom';
import {BrowserRouter} from 'react-router-dom';

import App from './App';

import 'antd/dist/antd.min.css';
import './main.scss';

render(
    <BrowserRouter>
        <App />
    </BrowserRouter>,
    document.getElementById('root'),
);
