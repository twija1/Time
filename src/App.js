import React from 'react';
import './App.css';
import Clock from "./Clock";
import TimerWrapper from "./TimerWrapper"
import SignIn from "./SignIn";
import Container from "@material-ui/core/Container";
import {Switch, Link} from 'react-router-dom'
import Button from "@material-ui/core/Button";
import PublicRoute from "./PublicRoute";
import PrivateRoute from "./PrivateRoute";
import * as lg from './helpers'
import { Redirect } from 'react-router-dom'

function App() {

    return (
        <div className="App">
            <div>
                <Button component={Link} to='/clock'>clock</Button>
                <Button component={Link} to='/stopper'>stopper</Button>
                <Button component={Link} to='/'>signin</Button>
                {lg.isLogin() ?
                    <Button onClick={() => {
                        lg.logout();
                        window.location.reload()
                    }}>logout</Button>
                    : <Button onClick={() => {
                        lg.login();
                        window.location.reload()
                    }}>login</Button>}
            </div>
            <Container>
                <Switch>
                    <PrivateRoute path='/clock' component={Clock}/>
                    <PrivateRoute path='/stopper' component={TimerWrapper}/>
                    <PublicRoute restricted={true} exact path='/' component={SignIn}/>
                </Switch>
            </Container>
        </div>
    );
}

export default App;
