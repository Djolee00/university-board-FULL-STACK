package rs.ac.fon.universityboardbackend.web.dto.create;

import jakarta.validation.constraints.NotNull;
import java.util.Set;
import lombok.*;
import rs.ac.fon.universityboardbackend.constraint.DatesConstraint;
import rs.ac.fon.universityboardbackend.web.dto.base.BoardBaseDto;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@DatesConstraint
public class BoardCreateDto extends BoardBaseDto {

    @NotNull private Set<MembershipCreateDto> memberships;
}
