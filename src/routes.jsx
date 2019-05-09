import React from 'react';
import { BrowserRouter as Router , Route , Switch } from 'react-router-dom';
import Index from './containers/Index';
import TopicInfo from './containers/TopicInfo/TopicInfo';
const routes = [
    {
        exact : true,
        path : '/',
        component : Index
    },
    {
        exact : true,
        path : "/topic/:id",
        component : TopicInfo
    }
]
const Routes = (
    <Router>
        <Switch>
            {
                routes.map(route => (
                    <Route 
                        key={route.path}
                        exact={route.exact}
                        path={route.path}
                        component={route.component}
                    />
                ))
            }
        </Switch>
    </Router>
);
export default Routes;