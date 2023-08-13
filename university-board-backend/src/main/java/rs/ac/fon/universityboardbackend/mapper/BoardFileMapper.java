package rs.ac.fon.universityboardbackend.mapper;

import org.mapstruct.Mapper;
import rs.ac.fon.universityboardbackend.model.board.BoardFile;
import rs.ac.fon.universityboardbackend.web.dto.base.BoardFileBaseDto;

@Mapper(componentModel = "spring")
public interface BoardFileMapper {

    BoardFileBaseDto boardFileToBoardFileBaseDto(BoardFile boardFile);
}
