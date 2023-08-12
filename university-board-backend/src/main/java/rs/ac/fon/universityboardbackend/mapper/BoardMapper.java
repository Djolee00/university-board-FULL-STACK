package rs.ac.fon.universityboardbackend.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;
import rs.ac.fon.universityboardbackend.model.board.Board;
import rs.ac.fon.universityboardbackend.web.dto.create.BoardCreateDto;

@Mapper
public interface BoardMapper {

    BoardMapper INSTANCE = Mappers.getMapper(BoardMapper.class);

    Board boardCreateDtoToBoard(BoardCreateDto boardCreateDto);
}
