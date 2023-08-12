package rs.ac.fon.universityboardbackend.service;

import rs.ac.fon.universityboardbackend.model.board.Comment;

public interface CommentService {

    void saveOrUpdate(Comment comment);
}
