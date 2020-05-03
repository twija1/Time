import React, {useState} from 'react';
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import {register} from "./helpers";

function Register() {
    const [nickname, setNickname] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        register({nickname, email, password});
        e.preventDefault()
    };

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    const handleNicknameChange = (event) => {
        setNickname(event.target.value);
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <TextField value={nickname} label='Nickname' variant='outlined' onChange={handleNicknameChange}/>
                <TextField value={email} label='E-mail' variant='outlined' onChange={handleEmailChange}/>
                <TextField value={password} label='Password' variant='outlined' onChange={handlePasswordChange} type='password'/>
                <Button type='submit'>Submit</Button>
            </form>
        </div>
    )
}

export default Register