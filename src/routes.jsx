import React from 'react';
import { BrowserRouter as Router , Route , Switch } from 'react-router-dom';
import Index from './containers/Index/Index';
const routes = [
    {
        exact : true,
        path : '/',
        component : Index
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