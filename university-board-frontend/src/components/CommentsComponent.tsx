import React, { useState } from "react";
import { Avatar, Grid, Paper, Button } from "@mui/material";
import { Comment } from "../models/Board";

interface Props {
  comments: Comment[];
}

const CommentsComponent = ({ comments }: Props) => {
  const [visibleComments, setVisibleComments] = useState(2);
  const [showAll, setShowAll] = useState(false);
  const defaultNumOfComments = 2;

  const handleShowMore = () => {
    setVisibleComments(comments.length);
    setShowAll(true);
  };

  const handleShowLess = () => {
    setVisibleComments(2);
    setShowAll(false);
  };

  return (
    <Paper
      style={{
        padding: "20px",
        border: "1px solid #ddd",
        borderRadius: "5px",
        margin: "25px",
        backgroundColor: "#f9f9f9",
        maxWidth: "500px",
        maxHeight: "400px",
        overflow: "auto",
      }}
    >
      {comments.slice(0, visibleComments).map((comment, index) => (
        <Paper
          key={comment.uuid}
          style={{
            padding: "20px",
            marginBottom: "20px",
            maxWidth: "400px",
            maxHeight: "200px",
            overflow: "auto",
          }}
        >
          <Grid container wrap="nowrap" spacing={2}>
            <Grid item>
              <Avatar />
            </Grid>
            <Grid justifyContent="left" item xs zeroMinWidth>
              <h4 style={{ margin: 0, textAlign: "left" }}>
                {comment.firstName} {comment.lastName}
              </h4>
              <p style={{ textAlign: "left" }}>{comment.description}</p>
              <p style={{ textAlign: "left", color: "gray" }}>
                Posted on{" "}
                {new Date(comment.time).toLocaleString("en-US", {
                  year: "numeric",
                  month: "2-digit",
                  day: "2-digit",
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </p>
            </Grid>
          </Grid>
        </Paper>
      ))}
      {comments.length > defaultNumOfComments && (
        <div>
          {showAll ? (
            <Button onClick={handleShowLess} style={{ marginTop: "10px" }}>
              Show Less
            </Button>
          ) : (
            <Button onClick={handleShowMore} style={{ marginTop: "10px" }}>
              Show More
            </Button>
          )}
        </div>
      )}
    </Paper>
  );
};

export default CommentsComponent;
