import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Editor } from './scenes/Editor';

export const RouterApp: React.FC = () => {
    return (
        <Router>
            <Switch>
                <Route path="/" exact>
                    <Editor></Editor>
                </Route>
            </Switch>
        </Router>
    );
};
