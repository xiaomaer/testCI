import * as React from 'react';
import Loadable from 'react-loadable';
import { Spin } from 'antd';

export default function WithLoadable(loader: any) {
    return Loadable({
        loader,
        loading: (props: any) => {
            if (props.error) {
                return (
                    <div>
                        Error! <button onClick={props.retry}>Retry</button>
                    </div>
                );
            } else if (props.timedOut) {
                return (
                    <div>
                        Taking a long time... <button onClick={props.retry}>Retry</button>
                    </div>
                );
            } else if (props.pastDelay) {
                return <Spin spinning={true} />;
            } else {
                return null;
            }
        }
    });
}
