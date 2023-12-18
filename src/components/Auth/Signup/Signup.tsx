import React, { useState } from 'react'
import Button from '@mui/material/Button';
import { Link, useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../../../firebase/firebase';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertProps } from '@mui/material/Alert';

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
    props,
    ref,
) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
const Signup = () => {
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const navigate = useNavigate()
    const [open, setOpen] = React.useState(false);
    const [error, setError] = useState<string | null>(null);
    const [isError, setIsError] = useState<boolean>(false)

    const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
        navigate('/login');
    };
    const handleError = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }

        setIsError(false);
    };


    const handleEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value)
    }
    const handlePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value)
    }

    const handleSignUp = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        try {
            setError(null);

            if (!email || !password) {
                throw new Error('Email and password are required.');
            }//validation
            if (password.length < 6) {
                throw new Error('Password must be at least 6 characters long.');
            }

            //firebase auth for signup
            const userCredential = await createUserWithEmailAndPassword(auth, email, password)
                .then(async (userCredential) => {

                    setEmail('')
                    setPassword('')
                    setOpen(true)
                })
                .catch((err) => {
                    console.log(err)
                })

        } catch (err: any) {
            //error handling
            console.error(err.message);
            setError(err.message || 'An error occurred during signup.');
            setIsError(true);
        }
    }
    return (
        <div>
            <div className='login__container'>
                <div className='login__subContainer'>
                    <form onSubmit={handleSignUp} >
                        <h2>SIGN UP</h2>

                        <div className='login__inputContainer'>
                            <h3 className='login__subTitle'>Email</h3>
                            <input className='login__input' type='email' value={email} onChange={handleEmail} />
                        </div>
                        <div className='login__inputContainer'>
                            <h3 className='login__subTitle'>Password</h3>
                            <input className='login__input' type='password' value={password} onChange={handlePassword} />
                        </div>
                        <Button type='submit' className='login__button' variant="contained">Signup</Button>                    </form>
                    <div className='login__link'>
                        <Link style={{ textDecoration: 'none', color: 'black', fontWeight: 'bolder' }} to='/login'><h3 style={{ cursor: 'pointer', fontSize: '13px' }}>Login with existing account</h3></Link>

                    </div>

                </div>
            </div>
            <Snackbar open={open} autoHideDuration={2000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                    Signup successful!
                </Alert>
            </Snackbar>
            <Snackbar open={isError} autoHideDuration={2000} onClose={handleError}>
                <Alert onClose={handleError} severity="error" sx={{ width: '100%' }}>
                    {error}
                </Alert>
            </Snackbar>

        </div>)
}

export default Signup