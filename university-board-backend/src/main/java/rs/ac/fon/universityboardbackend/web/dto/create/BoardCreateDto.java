package rs.ac.fon.universityboardbackend.web.dto.create;

import jakarta.validation.constraints.NotNull;
import java.time.LocalDate;
import java.util.Set;
import lombok.Getter;
import rs.ac.fon.universityboardbackend.model.board.Board.BoardStatus;
import rs.ac.fon.universityboardbackend.web.dto.base.BoardBaseDto;
import rs.ac.fon.universityboardbackend.web.dto.base.BoardTypeDto;

@Getter
public class BoardCreateDto extends BoardBaseDto {

    @NotNull private final Set<MembershipCreateDto> memberships;

    public BoardCreateDto(
            String name,
            String description,
            LocalDate startDate,
            LocalDate endDate,
            BoardStatus status,
            BoardTypeDto boardType,
            Set<MembershipCreateDto> memberships) {
        super(name, description, startDate, endDate, status, boardType);
        this.memberships = memberships;
    }
}
