package rs.ac.fon.universityboardbackend.service.impl;

import java.util.HashSet;
import java.util.Set;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import rs.ac.fon.universityboardbackend.exception.ValidationException;
import rs.ac.fon.universityboardbackend.model.board.Board;
import rs.ac.fon.universityboardbackend.model.employee.Employee;
import rs.ac.fon.universityboardbackend.repository.BoardRepository;
import rs.ac.fon.universityboardbackend.service.BoardService;

@Service
@RequiredArgsConstructor
public class BoardServiceImpl implements BoardService {

    private final BoardRepository boardRepository;

    @Override
    public void saveOrUpdate(Board board) {
        boardValidation(board);
        boardRepository.save(board);
    }

    private void boardValidation(Board board) {
        if (board.getMemberships() == null || board.getMemberships().isEmpty()) {
            throw new ValidationException("Board must have at least one member");
        }

        Set<Employee> existingEmployees = new HashSet<>();

        board.getMemberships()
                .forEach(
                        membership -> {
                            if (existingEmployees.contains(membership.getEmployee()))
                                throw new ValidationException(
                                        "One employee can not have more that 1 membership in board");
                            existingEmployees.add(membership.getEmployee());
                        });
    }
}
