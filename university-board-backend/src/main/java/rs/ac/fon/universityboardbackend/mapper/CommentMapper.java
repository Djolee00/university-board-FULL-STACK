package rs.ac.fon.universityboardbackend.mapper;

import org.mapstruct.Mapper;
import rs.ac.fon.universityboardbackend.model.board.Comment;
import rs.ac.fon.universityboardbackend.web.dto.base.CommentBaseDto;
import rs.ac.fon.universityboardbackend.web.dto.response.CommentResponseDto;

@Mapper(uses = MembershipMapper.class, componentModel = "spring")
public interface CommentMapper {
    Comment commentBaseDtoToComment(CommentBaseDto commentBaseDto);

    CommentResponseDto commentToCommentResponseDto(Comment comment);
}
