import React from 'react'
import Post from '../Post/Post'
import Button from '@mui/material/Button';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { Link } from 'react-router-dom';
import { signOut } from 'firebase/auth'
import { auth } from '../../firebase/firebase';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { authActions } from '../../store/slice/authSlice';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertProps } from '@mui/material/Alert';

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
    props,
    ref,
) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
const Home = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated)
    const [open, setOpen] = React.useState(false);


    const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
        if (isAuthenticated) {
            dispatch(authActions.removeUserDetail());
            localStorage.removeItem('userEmail');
            localStorage.removeItem('userUID');
            navigate('/login');
        }
    };


    const handleLogout = async () => {
        try {
            await signOut(auth).then((user) => {
                setOpen(true)
            })


        } catch (err) {
            console.log(err)
        }
    }
    return (
        <div style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column' }}>
            {isAuthenticated ? <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px', marginBottom: '10px' }}><Button sx={{ width: '150px' }} onClick={handleLogout} variant="contained">Logout</Button></div> :
                <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px', marginBottom: '10px' }}> <Link to='/login'> <Button sx={{ width: '150px' }} variant="contained">Login</Button></Link></div>
            }

            {isAuthenticated ? <Post /> : <div style={{ display: 'flex', justifyContent: 'center', }}><h3>You need to login to see all post.</h3></div>}
            <Snackbar open={open} autoHideDuration={2000} onClose={handleClose}>
                <Alert severity="info" onClose={handleClose} sx={{ width: '100%' }}>
                    You are logout! Redirecting to login page.                </Alert>
            </Snackbar>
        </div>
    )
}

export default Home