import React, {useContext, useState} from 'react';
import './App.css';
import Clock from "./Components/Clock";
import TimerWrapper from "./Components/TimerWrapper"
import SignIn from "./Components/SignIn";
import Container from "@material-ui/core/Container";
import {Switch, Link} from 'react-router-dom'
import Button from "@material-ui/core/Button";
import PublicRoute from "./Components/PublicRoute";
import PrivateRoute from "./Components/PrivateRoute";
import * as lg from './helpers'
import LandingPage from "./Components/LandingPage";
import Register from "./Components/Register";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import {makeStyles} from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from '@material-ui/icons/Menu';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3)
    }
}));

function App() {
    const classes = useStyles();

    return (
        <div className="App">
            <div className={classes.root}>
                <AppBar position='static'>
                    <Toolbar>
                        <IconButton edge='start' className={classes.menuButton} color='inherit' aria-label='menu'>
                            <MenuIcon/>
                        </IconButton>
                        <Typography variant='h6' className={classes.title}>
                            Langing Page
                        </Typography>
                        <Button color="inherit" component={Link} to='/clock'>clock</Button>
                        <Button color="inherit" component={Link} to='/stopper'>stopper</Button>
                        {lg.isLogin() ?
                            undefined :
                            <Button color="inherit" component={Link} to='/signin'>signin</Button>}
                        {lg.isLogin() ?
                            <Button color="inherit" onClick={() => {
                                lg.logout();
                            }}>logout</Button>
                            : undefined}
                        {lg.isLogin() ?
                            undefined :
                            <Button color="inherit" component={Link} to='/register'>register</Button>}
                    </Toolbar>
                </AppBar>
            </div>
            <Container className={classes.content}>
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
