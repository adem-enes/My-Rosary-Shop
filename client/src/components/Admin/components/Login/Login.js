import React, { useState } from 'react';
import { Grid, Container, Paper, Avatar, Typography, Button } from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOpenOutlined';
import useStyles from './style';
import Input from './Input';
import { login } from '../../ApiServices';

const Login = () => {
    const classes = useStyles();
    const [showPassword, setShowPassword] = useState(false);


    const handleSubmit = (event) => {
        login({
            username: event.target.username.value,
            password: event.target.password.value
        })
            .then((results) => {
                const date = new Date();
                date.setHours(date.getHours() + 2);
                document.cookie=`userId=${results.data.userId};expires=${date};`;
                localStorage.setItem('user', JSON.stringify(results.data));

                window.location.reload();
            });

        event.preventDefault();
    }

    return (
        <Container component="main" maxWidth="xs">
            <Paper className={classes.paper} elevation={3}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>

                <Typography variant="h5" >'Sign In'</Typography>
                <form className={classes.form} onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        <Input name="username" label="User Name" type="text" />
                        <Input name="password" label="Password" type={showPassword ? "text" : "password"}
                            handleShowPassword={() => setShowPassword((prevShowPassword) => !prevShowPassword)} />
                    </Grid>

                    <Button type="submit" fullWidth variant="contained" className={classes.submit}>
                        Sign In
                    </Button>
                </form>

            </Paper>
        </Container>
    )
}

export default Login
