package rs.ac.fon.universityboardbackend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import rs.ac.fon.universityboardbackend.model.board.Board;

public interface BoardRepository extends JpaRepository<Board, Long> {}
