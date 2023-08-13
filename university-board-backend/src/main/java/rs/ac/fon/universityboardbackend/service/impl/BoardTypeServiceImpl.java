package rs.ac.fon.universityboardbackend.service.impl;

import java.util.UUID;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import rs.ac.fon.universityboardbackend.exception.ResourceNotFoundException;
import rs.ac.fon.universityboardbackend.model.board.BoardType;
import rs.ac.fon.universityboardbackend.repository.BoardTypeRepository;
import rs.ac.fon.universityboardbackend.service.BoardTypeService;

@Service
@RequiredArgsConstructor
public class BoardTypeServiceImpl implements BoardTypeService {

    private final BoardTypeRepository boardTypeRepository;

    @Override
    @Transactional(readOnly = true)
    public BoardType findByUuid(UUID uuid) {
        return boardTypeRepository
                .findByUuid(uuid)
                .orElseThrow(
                        () ->
                                new ResourceNotFoundException(
                                        "Board Type with UUID - " + uuid + " - doesn't exist"));
    }
}
