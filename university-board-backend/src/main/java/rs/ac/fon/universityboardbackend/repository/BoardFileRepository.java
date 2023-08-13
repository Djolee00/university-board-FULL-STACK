package rs.ac.fon.universityboardbackend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import rs.ac.fon.universityboardbackend.model.board.BoardFile;

public interface BoardFileRepository extends JpaRepository<BoardFile, Long> {}
