import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography'
import { CardActionArea } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import './PostDetail.css'

type PostProps = {
    id: number,
    userId: number,
    title: string,
    body: string
}

const PostDetail = () => {
    const [post, setPost] = useState<PostProps | object>({})
    const { postId } = useParams()
    const getSinglePost = async () => {
        try {
            const response = await axios.get(`https://jsonplaceholder.typicode.com/posts/${postId}`)
            console.log(response)
            setPost(response.data)
        } catch (err) {
            console.log(err)
        }
    }
    useEffect(() => {
        getSinglePost()
    }, [])
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
        </div>
    )
}

export default PostDetail