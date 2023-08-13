package rs.ac.fon.universityboardbackend.service.impl;

import java.util.UUID;
import lombok.RequiredArgsConstructor;
import org.springframework.core.io.Resource;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;
import rs.ac.fon.universityboardbackend.client.FileServiceClient;
import rs.ac.fon.universityboardbackend.exception.ResourceNotFoundException;
import rs.ac.fon.universityboardbackend.model.board.Board;
import rs.ac.fon.universityboardbackend.model.board.BoardFile;
import rs.ac.fon.universityboardbackend.repository.BoardFileRepository;
import rs.ac.fon.universityboardbackend.service.BoardFileService;

@Service
@RequiredArgsConstructor
public class BoardFileServiceImpl implements BoardFileService {

    private final FileServiceClient fileServiceClient;
    private final BoardFileRepository boardFileRepository;

    @Override
    @Transactional
    public BoardFile uploadFile(MultipartFile file, Board board) {
        UUID fileUuid = fileServiceClient.uploadFile(file, board.getUuid());
        BoardFile boardFile =
                new BoardFile()
                        .setOriginalName(file.getOriginalFilename())
                        .setType(file.getContentType())
                        .setBoard(board);
        boardFile.setUuid(fileUuid);
        boardFileRepository.save(boardFile);
        return boardFile;
    }

    @Override
    public Resource downloadFile(BoardFile boardFile) {
        return fileServiceClient.downloadFile(boardFile.getBoard().getUuid(), boardFile.getUuid());
    }

    @Override
    @Transactional(readOnly = true)
    public BoardFile findByUuid(UUID uuid) {
        return boardFileRepository
                .findByUuid(uuid)
                .orElseThrow(
                        () ->
                                new ResourceNotFoundException(
                                        "Board File with UUID - " + uuid + " - doesn't exist"));
    }

    @Override
    @Transactional
    public void updateFile(BoardFile boardFile, MultipartFile file) {
        fileServiceClient.updateFile(file, boardFile.getBoard().getUuid(), boardFile.getUuid());
        boardFile.setType(file.getContentType());
        boardFile.setOriginalName(file.getOriginalFilename());
        boardFileRepository.save(boardFile);
    }
}
