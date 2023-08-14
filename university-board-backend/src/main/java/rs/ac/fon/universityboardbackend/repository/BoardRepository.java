package rs.ac.fon.universityboardbackend.repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import rs.ac.fon.universityboardbackend.model.board.Board;

@Repository
public interface BoardRepository extends JpaRepository<Board, Long> {
    Optional<Board> findByUuid(UUID uuid);

    Page<Board> findAll(Specification<Board> search, Pageable pageable);

    List<Board> findAll(Specification<Board> search);
}
