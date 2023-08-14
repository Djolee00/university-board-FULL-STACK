package rs.ac.fon.universityboardbackend.web.controller;

import java.util.List;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import rs.ac.fon.universityboardbackend.mapper.BoardTypeMapper;
import rs.ac.fon.universityboardbackend.model.board.BoardType;
import rs.ac.fon.universityboardbackend.service.BoardTypeService;
import rs.ac.fon.universityboardbackend.web.dto.base.BoardTypeDto;

@RestController
@RequiredArgsConstructor
@RequestMapping("/board-types")
public class BoardTypeController {

    private final BoardTypeService boardTypeService;

    @GetMapping
    public ResponseEntity<List<BoardTypeDto>> getAllBoardTypes() {
        List<BoardType> boardTypes = boardTypeService.findAll();
        return ResponseEntity.ok(
                boardTypes.stream()
                        .map(BoardTypeMapper.INSTANCE::boardTypeToBoardTypeDto)
                        .collect(Collectors.toList()));
    }
}
