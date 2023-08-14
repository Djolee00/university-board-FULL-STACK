package rs.ac.fon.universityboardbackend.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import rs.ac.fon.universityboardbackend.model.board.Comment;
import rs.ac.fon.universityboardbackend.web.dto.base.CommentBaseDto;
import rs.ac.fon.universityboardbackend.web.dto.response.CommentResponseDto;

@Mapper(uses = MembershipMapper.class, componentModel = "spring")
public interface CommentMapper {
    Comment commentBaseDtoToComment(CommentBaseDto commentBaseDto);

    @Mapping(target = "firstName", source = "comment.userProfile.employee.firstName")
    @Mapping(target = "lastName", source = "comment.userProfile.employee.lastName")
    @Mapping(target = "email", source = "comment.userProfile.email")
    CommentResponseDto commentToCommentResponseDto(Comment comment);
}
