package rs.ac.fon.universityboardbackend.web.dto.base;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import java.time.LocalDate;
import lombok.*;
import org.springframework.format.annotation.DateTimeFormat;
import rs.ac.fon.universityboardbackend.model.board.Board.BoardStatus;

@Getter
@Setter
@NoArgsConstructor
public class BoardBaseDto implements BaseDto {

    @NotBlank protected String name;
    @NotBlank protected String description;

    @NotNull
    @DateTimeFormat(iso = DateTimeFormat.ISO.DATE)
    protected LocalDate startDate;

    @NotNull
    @DateTimeFormat(iso = DateTimeFormat.ISO.DATE)
    protected LocalDate endDate;

    @NotNull protected BoardStatus status;
    @NotNull protected BoardTypeDto boardType;
}
