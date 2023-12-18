import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import './AllPost.css'
import Pagination from '@mui/material/Pagination';

type AllPostProps = {
    id: number,
    userId: number,
    title: string,
    body: string
}

const AllPost = () => {
    const [allPost, setAllPost] = useState<AllPostProps[]>([])
    const [currentPage, setCurrentPage] = useState<number>(1);
    const ItemsPerPage: number = 20;

    const startIndex: number = (currentPage - 1) * ItemsPerPage;
    const endIndex: number = startIndex + ItemsPerPage;
    const currentItems: AllPostProps[] = allPost.slice(startIndex, endIndex);

    const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
        setCurrentPage(value);
    };

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
    }, [currentPage])
    return (
        <div className='post'>
            {allPost.length > 0 &&
                currentItems.map((post, idx) => (
                    <div key={idx}>
                        <Card variant="outlined" sx={{ minWidth: 275, width: '300px', height: '400px', margin: '10px', marginLeft: '20px' }}>
                            <CardContent sx={{ height: '300px' }}>
                                <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                                    Post
                                </Typography>
                                <Typography variant="h5" component="div">
                                    {post?.title}
                                </Typography>
                                <Typography variant="body2">
                                    {post?.body}
                                    <br />
                                </Typography>
                            </CardContent>
                            <Link style={{ textDecoration: 'none' }} to={`/posts/${post.id}`}>
                                <CardActions>
                                    <Button size="small">View Details</Button>
                                </CardActions>
                            </Link>
                        </Card>
                    </div>
                ))
            }
                <Pagination
                sx={{margin:'10px'}}
                    count={Math.ceil(allPost.length / ItemsPerPage)}
                    page={currentPage}
                    onChange={handlePageChange}
                    variant="outlined"
                    color="primary"
                />
        </div>
    )
}

export default AllPost