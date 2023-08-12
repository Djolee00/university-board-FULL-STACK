package rs.ac.fon.universityboardbackend.service.impl;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import rs.ac.fon.universityboardbackend.model.board.Board;
import rs.ac.fon.universityboardbackend.repository.BoardRepository;
import rs.ac.fon.universityboardbackend.service.BoardService;

@Service
@RequiredArgsConstructor
public class BoardServiceImpl implements BoardService {

    private final BoardRepository boardRepository;
    @Override
    public void saveOrUpdate(Board board) {
        boardRepository.save(board);
    }
}
