import React from 'react';

const Home = () => (
    <div>
        <div>It's the best Home</div>
        <button onClick={() => console.log('Hi, there!')}>Press me</button>
    </div>
);

export default {
    component: Home
};