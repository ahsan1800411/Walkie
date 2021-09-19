import React from "react";
import { useQuery, gql } from "@apollo/client";
import { Grid } from "semantic-ui-react";
import PostCard from "../PostCard";
export default function Home() {
  const {
    loading,
    data: { getPosts: posts },
  } = useQuery(FETCH_POSTS);
  console.log(posts);
  return (
    <>
      <Grid columns={2}>
        <Grid.Row>
          <h1>Recent Posts</h1>
        </Grid.Row>
        <Grid.Row>
          {loading ? (
            <h1>Loading Posts....</h1>
          ) : (
            posts &&
            posts.map((post) => (
              <Grid.Column key={post.id}>
                <PostCard post={post} />
              </Grid.Column>
            ))
          )}
        </Grid.Row>
      </Grid>
    </>
  );
}

const FETCH_POSTS = gql`
  {
    getPosts {
      id
      body
      createdAt
      username
      likeCount
      likes {
        username
      }
      commentCount
      comments {
        username
        body
        id
      }
    }
  }
`;
