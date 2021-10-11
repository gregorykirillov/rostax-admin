import React from 'react';
import ReactDom from 'react-dom';
import {BrowserRouter} from 'react-router-dom';

import App from './App';

import 'antd/dist/antd.min.css';
import './main.scss';

ReactDom.render(
    <BrowserRouter>
        <App />
    </BrowserRouter>,
    document.getElementById('root'),
);
