package rs.ac.fon.universityboardbackend.service;

import rs.ac.fon.universityboardbackend.model.board.BoardType;

import java.util.UUID;

public interface BoardTypeService {
    BoardType findByUuid(UUID uuid);
}
