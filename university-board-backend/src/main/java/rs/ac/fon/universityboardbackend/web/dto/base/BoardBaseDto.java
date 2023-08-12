package rs.ac.fon.universityboardbackend.web.dto.base;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import rs.ac.fon.universityboardbackend.model.board.Board;

import java.time.LocalDate;

@Getter
@RequiredArgsConstructor
public abstract class BoardBaseDto implements BaseDto{

    @NotBlank private final String name;
    @NotBlank private final String description;
    @NotNull private final LocalDate startDate;
    @NotNull private final LocalDate endDate;
    @NotNull private final Board.BoardStatus status;
}
