import React, { useEffect } from 'react';
import useStyles from './style';
import { Login, Dashboard } from './components';
import { Route } from 'react-router-dom';
import { getCookie } from '../../assets/classes/cookies';


const Admin = () => {
    const classes = useStyles();
    const admin = getCookie('userId')?.value;

    useEffect(() => {
        if (!admin) {
            localStorage.removeItem('user');
        }
    }, [admin]);

    return (
        <div style={{ minHeight: '92.5vh' }}>
            <div className={classes.toolbar} />
            <Route exact path="/admin">
                {admin ? <Dashboard /> : <Login />}
            </Route>
        </div>
    )
}

export default Admin;
