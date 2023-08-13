package rs.ac.fon.universityboardbackend.repository;

import java.util.Optional;
import java.util.UUID;
import org.springframework.data.jpa.repository.JpaRepository;
import rs.ac.fon.universityboardbackend.model.board.BoardFile;

public interface BoardFileRepository extends JpaRepository<BoardFile, Long> {
    Optional<BoardFile> findByUuid(UUID uuid);
}
