import React, {useState} from 'react';
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import {login} from "../helpers";

function SignIn() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (event) => {
        login({email, password}).then(response => {
            // eslint-disable-next-line no-unused-expressions
            if(response.token) {
                localStorage.setItem('TOKEN_KEY', response.token);
                window.location.reload()
            }
        });
        event.preventDefault();
    };

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <TextField value={email} label='E-mail' variant='outlined' onChange={handleEmailChange}/>
                <TextField value={password} label='Password' variant='outlined' onChange={handlePasswordChange} type='password'/>
                <Button type='submit'>Submit</Button>
            </form>
        </div>
    )
}

export default SignIn