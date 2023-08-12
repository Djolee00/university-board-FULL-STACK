package rs.ac.fon.universityboardbackend.service.impl;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import rs.ac.fon.universityboardbackend.exception.ResourceNotFoundException;
import rs.ac.fon.universityboardbackend.model.board.BoardType;
import rs.ac.fon.universityboardbackend.repository.BoardTypeRepository;
import rs.ac.fon.universityboardbackend.service.BoardTypeService;

import java.util.UUID;

@Service
@RequiredArgsConstructor
public class BoardTypeServiceImpl implements BoardTypeService {

    private final BoardTypeRepository boardTypeRepository;
    @Override
    public BoardType findByUuid(UUID uuid) {
        return boardTypeRepository.findByUuid(uuid).orElseThrow(() -> new ResourceNotFoundException("Board Type with UUID - " + uuid + " - doesn't exist"));
    }
}
