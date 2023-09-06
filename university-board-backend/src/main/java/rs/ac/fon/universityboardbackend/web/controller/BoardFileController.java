package rs.ac.fon.universityboardbackend.web.controller;

import java.util.UUID;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import rs.ac.fon.universityboardbackend.mapper.BoardFileMapper;
import rs.ac.fon.universityboardbackend.model.board.Board;
import rs.ac.fon.universityboardbackend.model.board.BoardFile;
import rs.ac.fon.universityboardbackend.model.user.Privilege.PrivilegeCode;
import rs.ac.fon.universityboardbackend.service.AuthorizationService;
import rs.ac.fon.universityboardbackend.service.BoardFileService;
import rs.ac.fon.universityboardbackend.service.BoardService;
import rs.ac.fon.universityboardbackend.service.UserProfileService;
import rs.ac.fon.universityboardbackend.web.dto.base.BoardFileBaseDto;

@RestController
public class BoardFileController extends AbstractController {

    private final BoardFileService boardFileService;
    private final BoardService boardService;
    private final BoardFileMapper boardFileMapper;

    public BoardFileController(
            AuthorizationService authorizationService,
            UserProfileService userProfileService,
            BoardFileService boardFileService,
            BoardService boardService,
            BoardFileMapper boardFileMapper) {
        super(authorizationService, userProfileService);
        this.boardFileService = boardFileService;
        this.boardService = boardService;
        this.boardFileMapper = boardFileMapper;
    }

    @PostMapping("/{boardUuid}/files")
    public ResponseEntity<BoardFileBaseDto> uploadFile(
            @PathVariable UUID boardUuid, @RequestParam MultipartFile file) {
        hasPrivilegeOrThrow(PrivilegeCode.FILE_UP);
        Board board = boardService.findByUuid(boardUuid);
        BoardFile boardFile = boardFileService.uploadFile(file, board);
        return new ResponseEntity<>(
                boardFileMapper.boardFileToBoardFileBaseDto(boardFile), HttpStatus.CREATED);
    }

    @GetMapping("/files/{uuid}")
    public ResponseEntity<Resource> downloadFile(@PathVariable UUID uuid) {
        hasPrivilegeOrThrow(PrivilegeCode.FILE_DOWN);
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
        hasPrivilegeOrThrow(PrivilegeCode.FILE_UP);
        BoardFile boardFile = boardFileService.findByUuid(uuid);
        boardFileService.updateFile(boardFile, file);
        return ResponseEntity.ok(boardFileMapper.boardFileToBoardFileBaseDto(boardFile));
    }

    @DeleteMapping("/files/{uuid}")
    public ResponseEntity<Void> deleteFile(@PathVariable UUID uuid) {
        hasPrivilegeOrThrow(PrivilegeCode.FILE_D);
        BoardFile boardFile = boardFileService.findByUuid(uuid);
        boardFileService.deleteFile(boardFile);
        return ResponseEntity.noContent().build();
    }
}
