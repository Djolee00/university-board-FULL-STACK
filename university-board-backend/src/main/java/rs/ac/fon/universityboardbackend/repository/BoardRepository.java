package rs.ac.fon.universityboardbackend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import rs.ac.fon.universityboardbackend.model.board.Board;

@Repository
public interface BoardRepository extends JpaRepository<Board, Long> {}
