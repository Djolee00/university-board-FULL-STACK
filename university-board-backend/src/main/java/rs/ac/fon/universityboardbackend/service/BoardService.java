package rs.ac.fon.universityboardbackend.service;

import java.util.UUID;
import rs.ac.fon.universityboardbackend.model.board.Board;

public interface BoardService {

    void saveOrUpdate(Board board);

    Board findByUuid(UUID uuid);
}
