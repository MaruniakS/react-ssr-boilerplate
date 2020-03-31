import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { renderRoutes } from 'react-router-config';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import axios from 'axios';
import StyleContext from 'isomorphic-style-loader/StyleContext'

import Routes from './routes';
import reducers from './reducers';

const axiosInstance = axios.create({
    baseURL: '/api'
});

const store = createStore(
    reducers,
    window.INITIAL_STATE || {},
    applyMiddleware(thunk.withExtraArgument(axiosInstance))
);

const insertCss = (...styles) => {
    const removeCss = styles.map(style => style._insertCss())
    return () => removeCss.forEach(dispose => dispose())
}

ReactDOM.hydrate(
    <StyleContext.Provider value={{ insertCss }}>
        <Provider store={store}>
            <BrowserRouter>
                <div>
                    { renderRoutes(Routes) }
                </div>
            </BrowserRouter>
        </Provider>
    </StyleContext.Provider>,
    document.querySelector('#root')
);
