package rs.ac.fon.universityboardbackend.repository;

import java.util.Optional;
import java.util.UUID;
import org.springframework.data.jpa.repository.JpaRepository;
import rs.ac.fon.universityboardbackend.model.board.Comment;

public interface CommentRepository extends JpaRepository<Comment, Long> {
    Optional<Comment> findByUuid(UUID uuid);
}
