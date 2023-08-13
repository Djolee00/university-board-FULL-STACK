package rs.ac.fon.universityboardbackend.web.controller;

import java.util.UUID;
import lombok.RequiredArgsConstructor;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
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

    @GetMapping("/files/{uuid}")
    public ResponseEntity<Resource> downloadFile(@PathVariable UUID uuid) {
        BoardFile boardFile = boardFileService.findByUuid(uuid);
        Resource response = boardFileService.downloadFile(boardFile);
        return ResponseEntity.ok()
                .header(
                        HttpHeaders.CONTENT_DISPOSITION,
                        "attachment; filename=\"" + response.getFilename() + "\"")
                .body(response);
    }

    @PutMapping("/files/{uuid}")
    public ResponseEntity<BoardFileBaseDto> updateFile(
            @PathVariable UUID uuid, @RequestParam MultipartFile file) {
        BoardFile boardFile = boardFileService.findByUuid(uuid);
        boardFileService.updateFile(boardFile, file);
        return ResponseEntity.ok(boardFileMapper.boardFileToBoardFileBaseDto(boardFile));
    }
}
