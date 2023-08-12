package rs.ac.fon.universityboardbackend.service.impl;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
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
}
