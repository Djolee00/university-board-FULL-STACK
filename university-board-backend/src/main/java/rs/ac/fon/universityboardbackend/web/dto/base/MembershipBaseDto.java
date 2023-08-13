package rs.ac.fon.universityboardbackend.web.dto.base;

import jakarta.validation.constraints.NotNull;
import java.time.LocalDate;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.format.annotation.DateTimeFormat;
import rs.ac.fon.universityboardbackend.model.membership.Membership.MembershipStatus;

@Getter
@Setter
@NoArgsConstructor
public class MembershipBaseDto implements BaseDto {
    @NotNull
    @DateTimeFormat(iso = DateTimeFormat.ISO.DATE)
    protected LocalDate commencementDate;

    @NotNull protected MembershipStatus status;
}
