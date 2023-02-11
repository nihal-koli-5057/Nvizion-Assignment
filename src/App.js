import React from "react";
import AdminDashboard from './components/AdminDashboard';
import { BrowserRouter as Router, Redirect, Route, Switch } from "react-router-dom"

const App = () => {
    return (
        <div>
               <Redirect to="/admindashboard/employees" />
            <Switch>
                <Route path="/">
                    <AdminDashboard />
                </Route>
            </Switch>
        </div>
    );
};

export default App;


