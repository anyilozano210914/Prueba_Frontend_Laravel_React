import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

// Components
import User from './views/User/User';

// Styles 
import 'bootstrap/dist/css/bootstrap.min.css';
import './assets/scss/prueba.scss';

function App() {
    return(
        <div>
            <nav class="navbar navbar-light bg-light">
                <span class="navbar-brand mb-0 h1">Lista de usuarios</span>
            </nav>
            <Router>
                <Switch>
                    <Route exact path="/">
                        <User></User>
                    </Route>
                </Switch>
            </Router>
            <nav class="navbar navbar-light bg-light footer text-center">
                <span class="navbar-brand mb-0  h1">Desarrollado Por Anyi Lozano</span>
            </nav>
        </div>
    )
}

export default App; 

if (document.getElementById('app')) {
    ReactDOM.render(<App />, document.getElementById('app'));
}