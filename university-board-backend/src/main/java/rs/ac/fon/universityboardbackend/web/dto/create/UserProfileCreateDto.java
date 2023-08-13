package rs.ac.fon.universityboardbackend.web.dto.create;

import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import rs.ac.fon.universityboardbackend.web.dto.base.UserProfileBaseDto;

@Getter
@Setter
@NoArgsConstructor
public class UserProfileCreateDto extends UserProfileBaseDto {

    @NotBlank private String password;
}
