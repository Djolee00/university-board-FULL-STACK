package rs.ac.fon.universityboardbackend.web.dto.base;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import java.time.LocalDate;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;
import rs.ac.fon.universityboardbackend.model.board.Board.BoardStatus;

@Getter
@RequiredArgsConstructor
public abstract class BoardBaseDto implements BaseDto {

    @NotBlank protected final String name;
    @NotBlank protected final String description;

    @NotNull
    @DateTimeFormat(iso = DateTimeFormat.ISO.DATE)
    protected final LocalDate startDate;

    @NotNull
    @DateTimeFormat(iso = DateTimeFormat.ISO.DATE)
    protected final LocalDate endDate;

    @NotNull protected final BoardStatus status;
    @NotNull protected final BoardTypeDto boardType;
}
