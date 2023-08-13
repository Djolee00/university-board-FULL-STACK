package rs.ac.fon.universityboardbackend.web.controller;

import java.util.UUID;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import rs.ac.fon.universityboardbackend.mapper.BoardFileMapper;
import rs.ac.fon.universityboardbackend.model.board.Board;
import rs.ac.fon.universityboardbackend.model.board.BoardFile;
import rs.ac.fon.universityboardbackend.service.BoardFileService;
import rs.ac.fon.universityboardbackend.service.BoardService;
import rs.ac.fon.universityboardbackend.web.dto.base.BoardFileBaseDto;

@RestController
@RequiredArgsConstructor
public class BoardFileController {

    private final BoardFileService boardFileService;
    private final BoardService boardService;
    private final BoardFileMapper boardFileMapper;

    @PostMapping("/{boardUuid}/files")
    public ResponseEntity<BoardFileBaseDto> uploadFile(
            @PathVariable UUID boardUuid, @RequestParam MultipartFile file) {
        Board board = boardService.findByUuid(boardUuid);
        BoardFile boardFile = boardFileService.uploadFile(file, board);
        return new ResponseEntity<>(
                boardFileMapper.boardFileToBoardFileBaseDto(boardFile), HttpStatus.CREATED);
    }
}
