import React from 'react';
import { useEffect } from 'react';
import { wasFetchedInitially } from '../helpers/initialPath';

const Test = ({ route }) => {
    useEffect(() => {
        if (!wasFetchedInitially(route.path)) {
            console.log('load some data');
        }
    }, []);
    return <div>Test component</div>;
};

export default {
    component: Test,
    loadData: () => {
        console.log('load some data');
    }
};
