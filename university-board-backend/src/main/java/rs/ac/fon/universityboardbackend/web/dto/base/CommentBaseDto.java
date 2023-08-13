package rs.ac.fon.universityboardbackend.web.dto.base;

import jakarta.validation.constraints.NotBlank;
import java.time.OffsetDateTime;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class CommentBaseDto implements BaseDto {

    private String title;
    @NotBlank private String description;
    private OffsetDateTime time = OffsetDateTime.now();
}
