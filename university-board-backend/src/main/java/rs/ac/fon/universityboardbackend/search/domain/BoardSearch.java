package rs.ac.fon.universityboardbackend.search.domain;

import java.time.LocalDate;
import lombok.Getter;
import lombok.Setter;
import lombok.experimental.Accessors;
import org.springframework.format.annotation.DateTimeFormat;
import rs.ac.fon.universityboardbackend.model.board.Board.BoardStatus;
import rs.ac.fon.universityboardbackend.model.board.BoardType;

@Getter
@Setter
@Accessors(chain = true)
public class BoardSearch {

    private String nameLike;

    @DateTimeFormat(iso = DateTimeFormat.ISO.DATE)
    private LocalDate startDateFrom;

    @DateTimeFormat(iso = DateTimeFormat.ISO.DATE)
    private LocalDate endDateTo;

    private BoardStatus status;
    private BoardType boardType;
}
