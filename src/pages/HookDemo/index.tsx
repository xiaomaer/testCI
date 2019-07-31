import * as React from 'react';
import Counter from './Counter';
import Counter2 from './useReducer';

export default function App() {
    return (
        <>
            <Counter initialCount={10} />
            <br />
            <Counter2 />
        </>
    );
}
