import React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { renderRoutes } from 'react-router-config';
import { Helmet } from 'react-helmet';
import serialize from 'serialize-javascript';
import StyleContext from 'isomorphic-style-loader/StyleContext'

import Routes from '../client/routes';

export default ({ req, store, context, pathsWithLoadedData = [] }) => {
    const css = new Set();
    const insertCss = (...styles) => styles.forEach(style => css.add(style._getCss()));

    const content = renderToString(
        <StyleContext.Provider value={{ insertCss }}>
            <Provider store={store}>
                <StaticRouter location={req.path} context={context}>
                    <div>
                        { renderRoutes(Routes) }
                    </div>
                </StaticRouter>
            </Provider>
        </StyleContext.Provider>
    );

    const helmet = Helmet.renderStatic();

    return `
        <html>
            <head>
                ${helmet.title.toString()}
                ${helmet.meta.toString()}
                <style>${[...css].join('')}</style>
            </head>
            <body>
                <div id="root">${content}</div>
                <script>
                    window.INITIAL_STATE = ${serialize(store.getState())};
                    window.INITIALLY_LOADED_PATHS = ${JSON.stringify(pathsWithLoadedData)};
                </script>
                <script src="/bundle.js"></script>
            </body>
        </html>
    `;
};
