package rs.ac.fon.universityboardbackend.web.dto.search;

import java.time.LocalDate;
import java.util.UUID;
import org.springframework.format.annotation.DateTimeFormat;
import rs.ac.fon.universityboardbackend.model.board.Board.BoardStatus;

public record GetBoardDto(
        String nameLike,
        @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate startDateFrom,
        @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate endDateTo,
        BoardStatus status,
        UUID boardTypeUuid,
        UUID employeeUuid) {}
