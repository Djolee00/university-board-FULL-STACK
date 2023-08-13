package rs.ac.fon.universityboardbackend.web.dto.create;

import jakarta.validation.constraints.NotNull;
import java.util.Set;
import lombok.*;
import rs.ac.fon.universityboardbackend.web.dto.base.BoardBaseDto;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class BoardCreateDto extends BoardBaseDto {

    @NotNull private Set<MembershipCreateDto> memberships;
}
