package rs.ac.fon.universityboardbackend.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;
import rs.ac.fon.universityboardbackend.model.board.BoardType;
import rs.ac.fon.universityboardbackend.web.dto.base.BoardTypeDto;

@Mapper
public interface BoardTypeMapper {

    BoardTypeMapper INSTANCE = Mappers.getMapper(BoardTypeMapper.class);

    BoardType boardTypeDtoToBoardType(BoardTypeDto boardTypeDto);

    BoardTypeDto boardTypeToBoardTypeDto(BoardType boardType);
}
