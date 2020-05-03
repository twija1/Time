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
import LandingPage from "./LandingPage";
import Register from "./Register";

function App() {

    return (
        <div className="App">
            <div>
                <Button component={Link} to='/clock'>clock</Button>
                <Button component={Link} to='/stopper'>stopper</Button>
                <Button component={Link} to='/signin'>signin</Button>
                {lg.isLogin() ?
                    <Button onClick={() => {
                        lg.logout();
                    }}>logout</Button>
                    : undefined}
                {lg.isLogin() ?
                    undefined :
                    <Button component={Link} to='/register'>register</Button>}
            </div>
            <Container>
                <Switch>
                    <PrivateRoute path='/clock' component={Clock}/>
                    <PrivateRoute path='/stopper' component={TimerWrapper}/>
                    <PublicRoute restricted={true} exact path='/signin' component={SignIn}/>
                    <PublicRoute restricted={true} exact path='/register' component={Register}/>
                    <PublicRoute restricted={true} exact path='/' component={LandingPage}/>
                </Switch>
            </Container>
        </div>
    );
}

export default App;
