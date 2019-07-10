import * as React from 'react';
import * as ReactDOM from 'react-dom';
/* // 国际化，默认英文，修改为中文 */
import { LocaleProvider } from 'antd';
import zhCN from 'antd/lib/locale-provider/zh_CN';
import * as moment from 'moment';
import 'moment/locale/zh-cn';
moment.locale('zh-cn');
/* end */
import App from './App';
import './index.scss';

ReactDOM.render(
    <LocaleProvider locale={zhCN}>
        <App />
    </LocaleProvider>,
    document.getElementById('root')
);
