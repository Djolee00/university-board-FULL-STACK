package rs.ac.fon.universityboardbackend.service;

import org.springframework.web.multipart.MultipartFile;
import rs.ac.fon.universityboardbackend.model.board.Board;
import rs.ac.fon.universityboardbackend.model.board.BoardFile;

public interface BoardFileService {

    BoardFile uploadFile(MultipartFile file, Board board);
}
