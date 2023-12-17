import React,{useState} from 'react'
import Button from '@mui/material/Button';
import { Link, useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../../../firebase/firebase';

const Signup = () => {
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const navigate=useNavigate()

    const handleEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value)
    }
    const handlePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value)
    }

    const handleSignUp=async(e: React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault()
        try {

            const userCredential = await createUserWithEmailAndPassword(auth, email, password)
                .then(async (userCredential) => {
                
                    setEmail('')
                    setPassword('')
                    alert('Signup Successful!')
                    navigate('/login')
                })
                .catch((err) => {
                    console.log(err)
                })



        } catch (err) {
            console.log(err)
            alert(err)
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
                            <input className='login__input' type='email' value={email} onChange={(e) => setEmail(e.target.value)} />
                        </div>
                        <div className='login__inputContainer'>
                            <h3 className='login__subTitle'>Password</h3>
                            <input className='login__input' type='password' value={password} onChange={(e) => setPassword(e.target.value)} />
                        </div>
                        <Button type='submit' className='login__button' variant="contained">Signup</Button>                    </form>
                    <div className='login__link'>
                        <Link style={{ textDecoration: 'none', color: 'black', fontWeight: 'bolder' }} to='/login'><h3 style={{ cursor: 'pointer', fontSize: '13px' }}>Login with existing account</h3></Link>

                    </div>

                </div>
            </div>

        </div>  )
}

export default Signup