package rs.ac.fon.universityboardbackend.web.dto.response;

import java.util.Set;
import java.util.UUID;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import rs.ac.fon.universityboardbackend.web.dto.base.BoardBaseDto;
import rs.ac.fon.universityboardbackend.web.dto.base.BoardFileBaseDto;

@Getter
@Setter
@NoArgsConstructor
public class BoardResponseDto extends BoardBaseDto {

    private UUID uuid;
    private Set<CommentResponseDto> comments;
    private Set<MembershipResponseDto> memberships;
    private Set<BoardFileBaseDto> boardFiles;
}
