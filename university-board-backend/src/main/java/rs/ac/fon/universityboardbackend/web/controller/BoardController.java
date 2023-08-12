package rs.ac.fon.universityboardbackend.web.controller;

import jakarta.validation.Valid;
import java.util.UUID;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import rs.ac.fon.universityboardbackend.mapper.BoardMapper;
import rs.ac.fon.universityboardbackend.model.board.Board;
import rs.ac.fon.universityboardbackend.web.dto.create.BoardCreateDto;
import rs.ac.fon.universityboardbackend.web.dto.response.CreatedResponse;

@RestController
@RequestMapping("/boards")
public class BoardController {

    @PostMapping
    public ResponseEntity<CreatedResponse<UUID>> createBoard(
            @RequestBody @Valid BoardCreateDto boardCreateDto) {
        Board board = BoardMapper.INSTANCE.boardCreateDtoToBoard(boardCreateDto);
        System.out.println(board);
        return null;
    }
}
