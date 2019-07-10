import * as React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import WithLoadable from '@components/WithLoadable';

const Home = WithLoadable(() => import('./Home'));
const Login = WithLoadable(() => import('./Login'));

const App = () => (
    <Router>
        <Switch>
            <Route path="/login" component={Login} />
            {/* 这样就可以直接访问子路由了 */}
            <Home />
        </Switch>
    </Router>
);
export default App;
