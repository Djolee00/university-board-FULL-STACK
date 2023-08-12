package rs.ac.fon.universityboardbackend.service.impl;

import java.util.UUID;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import rs.ac.fon.universityboardbackend.exception.ResourceNotFoundException;
import rs.ac.fon.universityboardbackend.model.board.Comment;
import rs.ac.fon.universityboardbackend.repository.CommentRepository;
import rs.ac.fon.universityboardbackend.service.CommentService;

@Service
@RequiredArgsConstructor
public class CommentServiceImpl implements CommentService {

    private final CommentRepository commentRepository;

    @Override
    public void saveOrUpdate(Comment comment) {
        commentRepository.save(comment);
    }

    @Override
    public Comment findByUuid(UUID uuid) {
        return commentRepository
                .findByUuid(uuid)
                .orElseThrow(
                        () ->
                                new ResourceNotFoundException(
                                        "Comment with UUID - " + uuid + " - doesn't exist"));
    }

    @Override
    public void delete(Comment comment) {
        commentRepository.delete(comment);
    }
}
