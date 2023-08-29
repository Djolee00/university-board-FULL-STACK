import React, { useState } from "react";
import { Avatar, Grid, Paper, Button, TextField } from "@mui/material";
import { Comment } from "../models/Board";

interface Props {
  comments: Comment[];
  onAddComment: (comment: Comment) => void;
}

const CommentsComponent = ({ comments, onAddComment }: Props) => {
  const [visibleComments, setVisibleComments] = useState(2);
  const [showAll, setShowAll] = useState(false);
  const defaultNumOfComments = 2;
  const [newComment, setNewComment] = useState("");

  const handleShowMore = () => {
    setVisibleComments(comments.length);
    setShowAll(true);
  };

  const handleShowLess = () => {
    setVisibleComments(2);
    setShowAll(false);
  };

  const handleAddComment = () => {
    if (newComment.trim() !== "") {
      const comment: Comment = {
        uuid: null,
        firstName: null,
        lastName: null, // Replace with appropriate values
        description: newComment,
        time: null,
        title: null,
        email: null,
      };

      onAddComment(comment);
      setNewComment("");
    }
  };

  return (
    <>
      <h3
        style={{
          marginLeft: "40px",
          paddingTop: "10px",
          marginBottom: "2px",
        }}
      >
        Comments
      </h3>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <Paper
          style={{
            padding: "20px",
            border: "1px solid #ddd",
            borderRadius: "5px",
            margin: "25px",
            backgroundColor: "#f9f9f9",
            flex: "1",
            minHeight: "373px",
          }}
        >
          {comments.length !== 0 ? (
            comments
              .sort(
                (a, b) =>
                  new Date(b.time!).getTime() - new Date(a.time!).getTime()
              )
              .slice(0, visibleComments)
              .map((comment, index) => (
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
                        {new Date(comment.time!).toLocaleString("en-US", {
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
              ))
          ) : (
            <p>No comments. Feel free to leave one!</p>
          )}
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
        <Paper
          style={{
            padding: "20px",
            border: "1px solid #ddd",
            borderRadius: "5px",
            margin: "25px",
            backgroundColor: "#f9f9f9",
            flex: "1",
            maxHeight: "373px",
          }}
        >
          <h3>Add a New Comment</h3>
          <TextField
            label="Comment"
            onChange={(e) => setNewComment(e.target.value)}
            fullWidth
            multiline
            rows={4}
            margin="dense"
            style={{ backgroundColor: "#ffffff" }}
            value={newComment}
          />
          <Button
            //   onClick={handleAddComment}
            variant="contained"
            color="primary"
            style={{ marginTop: "10px" }}
            disabled={newComment.trim() === ""}
            onClick={handleAddComment}
          >
            Add Comment
          </Button>
        </Paper>
      </div>
    </>
  );
};

export default CommentsComponent;