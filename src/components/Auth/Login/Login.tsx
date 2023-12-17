import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword} from 'firebase/auth'
import { auth } from '../../../firebase/firebase';
import './Login.css'
import Button from '@mui/material/Button';

const Login = () => {
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const navigate = useNavigate()

    const handleEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value)
    }
    const handlePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value)
    }

    const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        try {
            await signInWithEmailAndPassword(auth, email, password)
                .then((userCredential) => {
                    let userDetail = {
                        name: userCredential.user.displayName,
                        email: userCredential.user.email,
                        photoUrl: userCredential.user.photoURL,
                        bio: '',
                        uid: userCredential.user.uid

                    }
                    localStorage.setItem('userName', userCredential.user.displayName as string)
                    localStorage.setItem('userEmail', userCredential.user.email as string)
                    localStorage.setItem('userPhotoUrl', userCredential.user.photoURL as string)
                    localStorage.setItem('userUID', userCredential.user.uid as string)

                    setEmail('')
                    setPassword('')
                    navigate('/')
                })

        } catch (err) {
            console.log(err)
            alert(err)
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
                        <input className='login__input' type='email' value={email} onChange={(e) => setEmail(e.target.value)} />
                    </div>
                    <div className='login__inputContainer'>
                        <h3 className='login__subTitle'>Password</h3>
                        <input className='login__input' type='password' value={password} onChange={(e) => setPassword(e.target.value)} />
                    </div>
                    <Button type='submit' className='login__button'  variant="contained">Login</Button>  
                                      </form>
                <div className='login__link'>
                    <Link style={{ textDecoration: 'none', color: 'black', fontWeight: 'bolder' }} to='/signup'> <h3 style={{ cursor: 'pointer', fontSize: '13px', textDecoration: 'none' }}>Create new account?</h3></Link>

                </div>
            </div>

        </div>
    </div>
    )
}

export default Login