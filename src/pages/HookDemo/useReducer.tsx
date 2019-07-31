import * as React from 'react';
const { useReducer } = React;

export interface IUseReducerDemoState {
    count: number;
}

const initialState: IUseReducerDemoState = {
    count: 0
};
const reducer = (state: IUseReducerDemoState, action: { type: string }) => {
    switch (action.type) {
        case 'increment':
            return {
                count: state.count + 1
            };
        case 'decrement':
            return {
                count: state.count - 1
            };
        default:
            throw new Error();
    }
};
export default function UseReducerDemo() {
    const [state, dispatch] = useReducer(reducer, initialState);
    return (
        <>
            Count:{state.count}
            <button onClick={() => dispatch({ type: 'increment' })}>+</button>
            <button onClick={() => dispatch({ type: 'decrement' })}>-</button>
        </>
    );
}
