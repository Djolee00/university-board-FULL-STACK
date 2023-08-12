package rs.ac.fon.universityboardbackend.service;

import java.util.UUID;
import rs.ac.fon.universityboardbackend.model.board.Comment;

public interface CommentService {

    void saveOrUpdate(Comment comment);

    Comment findByUuid(UUID uuid);

    void delete(Comment comment);
}
