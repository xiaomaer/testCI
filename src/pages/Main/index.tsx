import * as React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Sidebar from '@components/Sidebar';
import Header from '@components/Header';
import Home from '@pages/Home';
import './index.scss';

// Each logical "route" has two components, one for
// the sidebar and one for the main area. We want to
// render both of them in different places when the
// path matches the current URL.
const routes = [
    {
        path: '/',
        exact: true,
        title: '首页',
        main: Home
    },
    {
        path: '/bubblegum',
        title: 'bubblegum',
        main: () => <h2>Bubblegum content</h2>
    },
    {
        path: '/shoelaces',
        title: 'shoelaces',
        main: () => <h2>Shoelaces content</h2>
    }
];

const Title = (props: { title: string }) => {
    return <div>{props.title}</div>;
};
const SidebarExample = () => (
    <Router>
        <div className="page">
            <Header title="我是顶部导航条" />
            <Sidebar />
            <div className="page-content">
                <div className="page-title">
                    {routes.map((route, index) => (
                        // You can render a <Route> in as many places
                        // as you want in your app. It will render along
                        // with any other <Route>s that also match the URL.
                        // So, a sidebar or breadcrumbs or anything else
                        // that requires you to render multiple things
                        // in multiple places at the same URL is nothing
                        // more than multiple <Route>s.
                        <Route
                            key={index}
                            path={`/testCI${route.path}`}
                            exact={route.exact}
                            component={() => <Title title={route.title} />}
                        />
                    ))}
                </div>
                <div className="page-main">
                    {routes.map((route, index) => (
                        // Render more <Route>s with the same paths as
                        // above, but different components this time.
                        <Route
                            key={index}
                            path={`/testCI${route.path}`}
                            exact={route.exact}
                            component={route.main}
                        />
                    ))}
                </div>
            </div>
        </div>
    </Router>
);

export default SidebarExample;
