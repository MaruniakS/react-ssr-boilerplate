import React from 'react';
import { renderRoutes } from 'react-router-config';
import useStyles from 'isomorphic-style-loader/useStyles';

import Header from './components/Header';
import { fetchCurrentUser } from './actions';

import styles from './App.scss';

const App = ({ route }) => {
    useStyles(styles);
    return (
        <div className={styles.root}>
            <Header />
            { renderRoutes(route.routes) }    
        </div>
    )
};

export default {
    component: App,
    loadData: ({ dispatch }) => dispatch(fetchCurrentUser()) 
};
