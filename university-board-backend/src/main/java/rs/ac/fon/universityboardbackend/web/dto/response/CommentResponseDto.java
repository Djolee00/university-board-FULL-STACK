package rs.ac.fon.universityboardbackend.web.dto.response;

import jakarta.validation.constraints.NotNull;
import java.util.UUID;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import rs.ac.fon.universityboardbackend.web.dto.base.CommentBaseDto;

@Getter
@Setter
@NoArgsConstructor
public class CommentResponseDto extends CommentBaseDto {

    @NotNull private UUID uuid;
}
