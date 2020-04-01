import express from 'express';
import { matchRoutes } from 'react-router-config';
import proxy from 'express-http-proxy';
import renderer from './helpers/renderer';
import createStore from './helpers/createStore';
import Routes from './client/routes';

const app = express();

app.use(
    '/api',
    proxy('http://react-ssr-api.herokuapp.com', {
      proxyReqOptDecorator(opts) {
        opts.headers['x-forwarded-host'] = 'localhost:3000';
        return opts;
      }
    })
  );

app.use(express.static('public'));

app.get('*', (req, res) => {
    const store = createStore(req);

    const pathsWithLoadedData= [];

    const promises = matchRoutes(Routes, req.path)
        .map(({ route }) => {
            if (route.loadData) {
                route.path && pathsWithLoadedData.push(route.path);
                return route.loadData(store);
            } else {
                return Promise.resolve(null);
            }
        })
        .map(promise => {
            if (promise) {
                return new Promise(resolve => {
                    promise.then(resolve).catch(resolve);
                })
            }
        })

    Promise.all(promises).then(() => {
        const context = {};
        const content = renderer({ req, store, context, pathsWithLoadedData });

        if (context.url) {
            return res.redirect(301, context.url);
        }

        if (context.notFound) {
            res.status(404);
        }

        res.send(content);
    })
})

app.listen(3000, () => {
    console.log('Listening on port 3000!');
})