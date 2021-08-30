import React from 'react';
import ReactDOM from 'react-dom';
import Main from    './Main';
import {HashRouter, Switch, Route} from "react-router-dom";
import Create from "./Create";
import Edit from "./Edit";

function App() {
    return (
        <HashRouter className="App__container">
            <Switch>
                <Route exact path="/">
                    <Main></Main>
                </Route>
            </Switch>
            <Switch>
                <Route exact path="/create">
                    <Create></Create>
                </Route>
            </Switch>
            <Switch>
                <Route exact path="/edit/:id">
                    <Edit></Edit>
                </Route>
            </Switch>
        </HashRouter>
    );
}

export default App;

if (document.getElementById('app')) {
    ReactDOM.render(<App />, document.getElementById('app'));
}
