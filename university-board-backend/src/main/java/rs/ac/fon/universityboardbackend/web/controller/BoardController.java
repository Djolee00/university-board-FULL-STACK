package rs.ac.fon.universityboardbackend.web.controller;

import jakarta.validation.Valid;
import java.util.UUID;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import rs.ac.fon.universityboardbackend.mapper.BoardMapper;
import rs.ac.fon.universityboardbackend.model.board.Board;
import rs.ac.fon.universityboardbackend.model.board.BoardType;
import rs.ac.fon.universityboardbackend.service.BoardService;
import rs.ac.fon.universityboardbackend.service.BoardTypeService;
import rs.ac.fon.universityboardbackend.web.dto.create.BoardCreateDto;
import rs.ac.fon.universityboardbackend.web.dto.response.CreatedResponse;

@RestController
@RequestMapping("/boards")
@RequiredArgsConstructor
public class BoardController {

    private final BoardMapper boardMapper;
    private final BoardTypeService boardTypeService;
    private final BoardService boardService;

    @PostMapping
    public ResponseEntity<CreatedResponse<UUID>> createBoard(
            @RequestBody @Valid BoardCreateDto boardCreateDto) {

        Board board = boardMapper.boardCreateDtoToBoard(boardCreateDto);
        if (boardCreateDto.getBoardType().uuid() != null) {
            BoardType boardType = boardTypeService.findByUuid(boardCreateDto.getBoardType().uuid());
            board.setBoardType(boardType);
        }
        board.addMemberships(board.getMemberships());

        boardService.saveOrUpdate(board);

        return new ResponseEntity<>(new CreatedResponse<>(board.getUuid()), HttpStatus.CREATED);
    }
}
