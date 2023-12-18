import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import './AllPost.css'

type AllPostProps = {
    id: number,
    userId: number,
    title: string,
    body: string
}

const AllPost = () => {
    const [allPost, setAllPost] = useState<AllPostProps[]>([])

    const getAllPost = async () => {
        try {
            const response = await axios.get('https://jsonplaceholder.typicode.com/posts')
            console.log(response)

            setAllPost(response.data)

        } catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        getAllPost()
    }, [])
    return (
        <div className='post' >
            {
                allPost && allPost.map((post, idx) => {
                    return (
                        <div >
                            <Card variant="outlined" sx={{ minWidth: 275,width:'300px',height:'400px', margin:'10px',marginLeft:'20px' }}>
                                <CardContent sx={{height:'300px'}}>
                                    <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                                        Post
                                    </Typography>
                                    <Typography variant="h5" component="div">
                                        {post?.title}
                                    </Typography>

                                    <Typography variant="body2">
                                        {post?.body}
                                        <br />
                                        {'"a benevolent smile"'}
                                    </Typography>
                                </CardContent>
                                <Link style={{textDecoration:'none'}} to={`/posts/${post.id}`}>
                                <CardActions>
                                    <Button size="small">View Details</Button>
                                </CardActions>
                                </Link>
                           
                            </Card>

                        </div>

                    )
                })
            }


        </div>
    )
}

export default AllPost