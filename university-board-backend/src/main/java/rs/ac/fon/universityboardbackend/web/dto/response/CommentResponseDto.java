package rs.ac.fon.universityboardbackend.web.dto.response;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import java.util.UUID;
import lombok.Getter;
import rs.ac.fon.universityboardbackend.web.dto.base.CommentBaseDto;

@Getter
public class CommentResponseDto extends CommentBaseDto {

    @NotNull private final UUID uuid;

    public CommentResponseDto(String title, @NotBlank String description, UUID uuid) {
        super(title, description);
        this.uuid = uuid;
    }
}
