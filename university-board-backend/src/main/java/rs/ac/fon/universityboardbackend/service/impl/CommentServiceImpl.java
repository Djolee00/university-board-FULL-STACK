package rs.ac.fon.universityboardbackend.service.impl;

import jakarta.mail.MessagingException;
import java.util.List;
import java.util.UUID;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import rs.ac.fon.universityboardbackend.exception.MailServiceException;
import rs.ac.fon.universityboardbackend.exception.ResourceNotFoundException;
import rs.ac.fon.universityboardbackend.model.board.Comment;
import rs.ac.fon.universityboardbackend.model.membership.Membership;
import rs.ac.fon.universityboardbackend.repository.CommentRepository;
import rs.ac.fon.universityboardbackend.service.CommentService;
import rs.ac.fon.universityboardbackend.service.EmailService;

@Service
@RequiredArgsConstructor
public class CommentServiceImpl implements CommentService {

    private final CommentRepository commentRepository;
    private final EmailService emailService;

    @Override
    @Transactional
    public void saveOrUpdate(Comment comment) {
        final boolean create = comment.getUuid() == null;
        commentRepository.save(comment);
        if (create) {
            sendNewCommentMail(comment);
        }
    }

    @Override
    @Transactional(readOnly = true)
    public Comment findByUuid(UUID uuid) {
        return commentRepository
                .findByUuid(uuid)
                .orElseThrow(
                        () ->
                                new ResourceNotFoundException(
                                        "Comment with UUID - " + uuid + " - doesn't exist"));
    }

    @Override
    @Transactional
    public void delete(Comment comment) {
        commentRepository.delete(comment);
    }

    private void sendNewCommentMail(Comment comment) {
        List<Membership> memberships =
                comment.getBoard().getMemberships().stream()
                        .filter(
                                membership ->
                                        !membership
                                                .getEmployee()
                                                .getUserProfile()
                                                .getUuid()
                                                .equals(comment.getUserProfile().getUuid()))
                        .toList();
        if (!memberships.isEmpty()) {
            memberships.forEach(
                    membership -> {
                        try {
                            emailService.sendNewCommentMail(
                                    membership.getEmployee().getUserProfile(), comment);
                        } catch (MessagingException e) {
                            throw new MailServiceException(
                                    "Error sending mail with new comment info.", e);
                        }
                    });
        }
    }
}
