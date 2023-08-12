package rs.ac.fon.universityboardbackend.repository;

import java.util.Optional;
import java.util.UUID;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import rs.ac.fon.universityboardbackend.model.board.BoardType;

@Repository
public interface BoardTypeRepository extends JpaRepository<BoardType, Long> {

    Optional<BoardType> findByUuid(UUID uuid);
}
