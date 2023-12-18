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
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import CircularProgress from '@mui/material/CircularProgress';

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
    props,
    ref,
) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
type AllPostProps = {
    id: number,
    userId: number,
    title: string,
    body: string
}

const AllPost = () => {
    const [allPost, setAllPost] = useState<AllPostProps[]>([])
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [loading, setLoading] = useState(true);

    //logic for implementing pagination
    const ItemsPerPage: number = 20;

    const startIndex: number = (currentPage - 1) * ItemsPerPage;
    const endIndex: number = startIndex + ItemsPerPage;
    const currentItems: AllPostProps[] = allPost.slice(startIndex, endIndex);

    const [open, setOpen] = React.useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };
    const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
        setCurrentPage(value);
    };

    const getAllPost = async () => {
        try {
            //getting all post & storing it in state variable
            const response = await axios.get('https://jsonplaceholder.typicode.com/posts');

            if (response.status === 200) {
                setAllPost(response.data);
            } else {
                setError(`Unexpected response status: ${response.status}`);
            }
        } catch (err: any) {
            //error handling
            if (axios.isAxiosError(err)) {
                setError(`Axios error: ${err.message}`);
            } else if (err instanceof Error) {
                setError(`Error: ${err.message}`);
            } else {
                setError(`Unexpected error: ${err}`);
            }
            setOpen(true)
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        //fetching all post when the component get rendered & when the page is change
        setLoading(true);

        getAllPost()
    }, [currentPage])
    return (
        <div className='post'>
            {/* showing spinner if the data is not fetching else showing all post */}
            {loading ? (
                <CircularProgress sx={{marginTop:'10px'}} />
            ) : (
                <>
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
                        sx={{ margin: '10px' }}
                        count={Math.ceil(allPost.length / ItemsPerPage)}
                        page={currentPage}
                        onChange={handlePageChange}
                        variant="outlined"
                        color="primary"
                    />

                    <Snackbar open={open} autoHideDuration={2000} onClose={handleClose}>
                        <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
                            {error}
                        </Alert>
                    </Snackbar>
                </>
            )}


        </div>
    )
}

export default AllPost