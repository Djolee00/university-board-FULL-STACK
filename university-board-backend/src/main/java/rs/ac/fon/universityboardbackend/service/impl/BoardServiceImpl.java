package rs.ac.fon.universityboardbackend.service.impl;

import java.util.HashSet;
import java.util.Set;
import java.util.UUID;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import rs.ac.fon.universityboardbackend.exception.ResourceNotFoundException;
import rs.ac.fon.universityboardbackend.exception.ValidationException;
import rs.ac.fon.universityboardbackend.model.board.Board;
import rs.ac.fon.universityboardbackend.model.employee.Employee;
import rs.ac.fon.universityboardbackend.repository.BoardRepository;
import rs.ac.fon.universityboardbackend.service.BoardFileService;
import rs.ac.fon.universityboardbackend.service.BoardService;

@Service
@RequiredArgsConstructor
public class BoardServiceImpl implements BoardService {

    private final BoardRepository boardRepository;
    private final BoardFileService boardFileService;

    @Override
    @Transactional
    public void saveOrUpdate(Board board) {
        boardValidation(board);
        boardRepository.save(board);
    }

    @Override
    @Transactional(readOnly = true)
    public Board findByUuid(UUID uuid) {
        return boardRepository
                .findByUuid(uuid)
                .orElseThrow(
                        () ->
                                new ResourceNotFoundException(
                                        "Board with UUID - " + uuid + " - doesn't exist"));
    }

    @Override
    @Transactional
    public void delete(Board board) {
        if (board.getBoardFiles() != null && !board.getBoardFiles().isEmpty()) {
            board.getBoardFiles().forEach(boardFileService::deleteFile);
        }
        boardRepository.delete(board);
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

                            if (membership.getCommencementDate().isBefore(board.getStartDate())
                                    || membership
                                            .getCommencementDate()
                                            .isAfter(board.getEndDate())) {
                                throw new ValidationException(
                                        "Invalid commencement date for employee with UUID - "
                                                + membership.getEmployee().getUuid());
                            }
                        });
    }
}
