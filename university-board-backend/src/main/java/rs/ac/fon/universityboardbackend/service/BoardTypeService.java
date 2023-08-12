package rs.ac.fon.universityboardbackend.service;

import java.util.UUID;
import rs.ac.fon.universityboardbackend.model.board.BoardType;

public interface BoardTypeService {
    BoardType findByUuid(UUID uuid);
}
