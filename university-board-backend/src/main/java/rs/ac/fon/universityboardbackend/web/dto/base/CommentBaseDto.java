package rs.ac.fon.universityboardbackend.web.dto.base;

import jakarta.validation.constraints.NotBlank;
import java.time.OffsetDateTime;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public class CommentBaseDto implements BaseDto {

    private final String title;
    @NotBlank private final String description;
    private final int numOfLikes = 0;
    private final OffsetDateTime time = OffsetDateTime.now();
}
