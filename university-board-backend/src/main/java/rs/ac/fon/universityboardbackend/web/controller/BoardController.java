package rs.ac.fon.universityboardbackend.web.controller;

import jakarta.validation.Valid;
import java.util.Optional;
import java.util.UUID;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import rs.ac.fon.universityboardbackend.mapper.BoardMapper;
import rs.ac.fon.universityboardbackend.model.board.Board;
import rs.ac.fon.universityboardbackend.model.board.BoardType;
import rs.ac.fon.universityboardbackend.service.BoardService;
import rs.ac.fon.universityboardbackend.service.BoardTypeService;
import rs.ac.fon.universityboardbackend.web.dto.base.BoardBaseDto;
import rs.ac.fon.universityboardbackend.web.dto.create.BoardCreateDto;
import rs.ac.fon.universityboardbackend.web.dto.response.CreatedResponseDto;

@RestController
@RequestMapping("/boards")
@RequiredArgsConstructor
public class BoardController {

    private final BoardMapper boardMapper;
    private final BoardTypeService boardTypeService;
    private final BoardService boardService;

    @PostMapping
    public ResponseEntity<CreatedResponseDto<UUID>> createBoard(
            @RequestBody @Valid BoardCreateDto boardCreateDto) {

        Board board = boardMapper.boardCreateDtoToBoard(boardCreateDto);
        if (boardCreateDto.getBoardType().uuid() != null) {
            BoardType boardType = boardTypeService.findByUuid(boardCreateDto.getBoardType().uuid());
            board.setBoardType(boardType);
        }
        board.addMemberships(board.getMemberships());

        boardService.saveOrUpdate(board);

        return new ResponseEntity<>(new CreatedResponseDto<>(board.getUuid()), HttpStatus.CREATED);
    }

    @PatchMapping("/{uuid}")
    public ResponseEntity<Void> updateBoard(
            @PathVariable UUID uuid, @RequestBody BoardBaseDto boardBaseDto) {
        Board board = boardService.findByUuid(uuid);

        BoardType boardType;
        if (boardBaseDto.getBoardType() != null) {
            if (boardBaseDto.getBoardType().uuid() != null) {
                boardType = boardTypeService.findByUuid(boardBaseDto.getBoardType().uuid());
            } else {
                boardType = new BoardType().setName(boardBaseDto.getBoardType().name());
            }
            board.setBoardType(boardType);
        }

        Optional.ofNullable(boardBaseDto.getName()).ifPresent(board::setName);
        Optional.ofNullable(boardBaseDto.getDescription()).ifPresent(board::setDescription);
        Optional.ofNullable(boardBaseDto.getStartDate()).ifPresent(board::setStartDate);
        Optional.ofNullable(boardBaseDto.getEndDate()).ifPresent(board::setEndDate);

        boardService.saveOrUpdate(board);
        return ResponseEntity.ok().build();
    }
}
