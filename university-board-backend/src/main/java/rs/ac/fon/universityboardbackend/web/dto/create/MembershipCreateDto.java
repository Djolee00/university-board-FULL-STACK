package rs.ac.fon.universityboardbackend.web.dto.create;

import jakarta.validation.constraints.NotNull;
import java.util.UUID;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import rs.ac.fon.universityboardbackend.web.dto.base.MembershipBaseDto;

@Getter
@Setter
@NoArgsConstructor
public class MembershipCreateDto extends MembershipBaseDto {

    @NotNull private UUID employeeUuid;
}
