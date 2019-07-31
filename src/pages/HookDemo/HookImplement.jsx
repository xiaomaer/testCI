import { render } from 'react-dom';

// useState useEffect实现的核心是按照顺序进行存储、读取和逻辑判断
let memorizedState = [];
let currentCursor = 0;
function useState(initVal) {
    // 这里通过闭包保存不同state对应的顺序
    const cursor = currentCursor;
    memorizedState[currentCursor] = memorizedState[currentCursor] || initVal;
    function setVal(newVal) {
        console.log(cursor, '序号');
        memorizedState[cursor] = newVal;
        // 重新渲染
        render();
    }
    return [memorizedState[currentCursor++], setVal];
}

function useEffect(fn, watch) {
    const hasWatchChange = memorizedState[currentCursor]
        ? !watch.every((val, i) => val === memorizedState[currentCursor][i])
        : true;
    // 判断跟上次值是否一样，如果一样就不再执行
    if (hasWatchChange) {
        fn();
        memorizedState[currentCursor] = watch;
        currentCursor++;
    }
}
import React from 'react';

export default function HookImplement() {
    const [count, setCount] = useState(0);
    const [data, setData] = useState(1);

    useEffect(() => {
        console.log(`count:update--${count}`);
    }, [count]);
    useEffect(() => {
        console.log(`data:update--${data}`);
    }, [data]);
    return (
        <div>
            <button
                onClick={() => {
                    setCount(count + 1);
                }}
            >{`当前点击次数：${count}`}</button>
            <button
                onClick={() => {
                    setData(data + 2);
                }}
            >{`当前点击次数+2：${data}`}</button>
        </div>
    );
}
