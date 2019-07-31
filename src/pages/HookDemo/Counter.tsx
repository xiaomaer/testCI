import * as React from 'react';
const { useState, useEffect, useRef } = React;

export interface ICounterProps {
    initialCount: number;
}

export default function Counter(props: ICounterProps) {
    const [count, setCount] = useState(props.initialCount);
    const inputEl: any = useRef(null);
    const onButtonClick = () => {
        inputEl.current.focus();
    };
    useEffect(() => {
        console.log('didmount didupdate');
        return () => {
            console.log('willunmount');
        };
    }, [props.initialCount]);
    return (
        <>
            Count:{count}
            <button onClick={() => setCount(props.initialCount)}>Reset</button>
            <button onClick={() => setCount(count + 1)}>+</button>
            <button onClick={() => setCount(count - 1)}>-</button>
            <br />
            <input ref={inputEl} type="text" />
            <button onClick={onButtonClick}>focus the input</button>
        </>
    );
}
