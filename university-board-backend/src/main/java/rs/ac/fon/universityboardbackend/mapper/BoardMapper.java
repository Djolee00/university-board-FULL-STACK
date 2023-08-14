package rs.ac.fon.universityboardbackend.mapper;

import org.mapstruct.Mapper;
import rs.ac.fon.universityboardbackend.model.board.Board;
import rs.ac.fon.universityboardbackend.web.dto.create.BoardCreateDto;
import rs.ac.fon.universityboardbackend.web.dto.response.BoardResponseDto;

@Mapper(
        uses = {MembershipMapper.class, CommentMapper.class},
        componentModel = "spring")
public interface BoardMapper {

    Board boardCreateDtoToBoard(BoardCreateDto boardCreateDto);

    BoardResponseDto boardToBoardResponseDto(Board board);
}
