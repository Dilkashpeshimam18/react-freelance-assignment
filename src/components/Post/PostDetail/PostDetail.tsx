import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography'
import { CardActionArea } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import './PostDetail.css'
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertProps } from '@mui/material/Alert';

//material ui toast component
const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
    props,
    ref,
) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
//defining post type
type PostProps = {
    id: number,
    userId: number,
    title: string,
    body: string
}

const PostDetail = () => {
    const [post, setPost] = useState<PostProps | object>({})
    const { postId } = useParams()
    const [open, setOpen] = React.useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };
    const getSinglePost = async () => {
        try {
            //get post detail with error handling 
            const response = await axios.get(`https://jsonplaceholder.typicode.com/posts/${postId}`)
            if (response.status === 200) {
                setPost(response.data);
              } else {
                setError(`Unexpected response status: ${response.status}`);
              }
        } catch (err:any) {
            console.log(err)
            if (axios.isAxiosError(err)) {
                setError(`Axios error: ${err.message}`);
            
              } else {
                setError(`Unexpected error: ${err.message}`);
              }
              setOpen(true)
        }
    }
    useEffect(() => {
        getSinglePost()
    }, [postId])
    return (
        <div className='postDetail'>
            <Card sx={{ maxWidth: 345,height:'380px' }}>
                <CardActionArea>
                    <div style={{display:'flex',justifyContent:'center'}}>
                    <Avatar sx={{width:"150px",height:'150px'}} alt="Remy Sharp" src="/static/images/avatar/1.jpg" />

                    </div>

                    <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                            {(post as PostProps).title}          </Typography>
                        <Typography variant="body2" color="text.secondary">
                            {(post as PostProps).body}
                        </Typography>
                    </CardContent>
                </CardActionArea>
            </Card>

            <Snackbar open={open} autoHideDuration={2000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
                    {error}
                </Alert>
            </Snackbar>
        </div>
    )
}

export default PostDetail