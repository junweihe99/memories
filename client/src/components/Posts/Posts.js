import React from "react";
import { Grid, CircularProgress, Typography, Card } from '@material-ui/core';
import { useSelector } from 'react-redux';
import Post from './Post/Post';
import useStyles from './styles';

export default function Posts({ setCurrentId }) {
  //Access to whole gloabl redux store
  const { posts, isLoading } = useSelector((state) => state.posts);
  const classes = useStyles();

  if(!posts.length && !isLoading) {
    return (
      <Card raised elevation={6} >
        <Typography variant="h6" align="center">No posts matching search</Typography>
      </Card>
    )
  }
  
  return (
    isLoading ? <CircularProgress /> : (
      <Grid className={classes.container} container alignItems="stretch" spacing={3}>
        {posts.map((post) => (
          <Grid key={post._id} item xs={12} sm={12} md={6} lg={3}>
            <Post post={post} setCurrentId={setCurrentId}/>
          </Grid>
        ))}
      </Grid>
    )
  );
}
