package rs.ac.fon.universityboardbackend.service;

import java.util.List;
import java.util.UUID;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import rs.ac.fon.universityboardbackend.model.board.Board;
import rs.ac.fon.universityboardbackend.search.domain.BoardSearch;

public interface BoardService {

    void saveOrUpdate(Board board);

    Board findByUuid(UUID uuid);

    void delete(Board board);

    Page<Board> findAll(BoardSearch boardSearch, Pageable pageable);

    List<Board> findAll(BoardSearch boardSearch);
}
