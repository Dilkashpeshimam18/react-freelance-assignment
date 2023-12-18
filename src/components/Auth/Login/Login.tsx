import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../../../firebase/firebase';
import './Login.css'
import Button from '@mui/material/Button';
import { useDispatch } from 'react-redux';
import { authActions } from '../../../store/slice/authSlice';

import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertProps } from '@mui/material/Alert';

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
    props,
    ref,
) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});


const Login = () => {
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [open, setOpen] = React.useState(false);


    const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };


    const handleEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value)
    }
    const handlePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value)
    }

    const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        try {
            setError(null); // Reset any previous errors

            if (!email || !password) {
                throw new Error('Email and password are required.');
            }
            if (password.length < 6) {
                throw new Error('Password must be at least 6 characters long.');
            }
            await signInWithEmailAndPassword(auth, email, password)
                .then((userCredential) => {
                    let userDetail = {
                        email: userCredential.user.email,
                        uid: userCredential.user.uid
                    }

                    dispatch(authActions.addUserDetail(userDetail))
                    localStorage.setItem('userEmail', userCredential.user.email as string)
                    localStorage.setItem('userUID', userCredential.user.uid as string)

                    setEmail('')
                    setPassword('')
                    navigate('/')
                })

        } catch (err: any) {
            console.error(err.message);
            setError(err.message || 'An error occurred during login.');
            setOpen(true); // Open the Snackbar
        }
    }

    return (
        <div className='login'>
            <div className='login__container'>
                <div className='login__subContainer'>
                    <form onSubmit={handleLogin} >

                        <h2>Login</h2>
                        <div className='login__inputContainer'>
                            <h3 className='login__subTitle'>Email</h3>
                            <input className='login__input' type='email' value={email} onChange={handleEmail} required />
                        </div>
                        <div className='login__inputContainer'>
                            <h3 className='login__subTitle'>Password</h3>
                            <input className='login__input' type='password' value={password} onChange={handlePassword} required />
                        </div>
                        <Button type='submit' className='login__button' variant="contained">Login</Button>
                    </form>
                    <div className='login__link'>
                        <Link style={{ textDecoration: 'none', color: 'black', fontWeight: 'bolder' }} to='/signup'> <h3 style={{ cursor: 'pointer', fontSize: '13px', textDecoration: 'none' }}>Create new account?</h3></Link>

                    </div>
                </div>

            </div>
            <Snackbar open={open} autoHideDuration={2000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
                    {error}
                </Alert>
            </Snackbar>

        </div>
    )
}

export default Login