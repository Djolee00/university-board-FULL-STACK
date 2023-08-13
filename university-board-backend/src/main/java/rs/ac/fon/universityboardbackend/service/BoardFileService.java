package rs.ac.fon.universityboardbackend.service;

import java.util.UUID;
import org.springframework.core.io.Resource;
import org.springframework.web.multipart.MultipartFile;
import rs.ac.fon.universityboardbackend.model.board.Board;
import rs.ac.fon.universityboardbackend.model.board.BoardFile;

public interface BoardFileService {

    BoardFile uploadFile(MultipartFile file, Board board);

    Resource downloadFile(BoardFile boardFile);

    BoardFile findByUuid(UUID uuid);
}
