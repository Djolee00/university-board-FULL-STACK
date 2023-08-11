package rs.ac.fon.universityboardbackend.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;
import rs.ac.fon.universityboardbackend.model.employee.Employee;
import rs.ac.fon.universityboardbackend.web.dto.create.EmployeeCreateDto;
import rs.ac.fon.universityboardbackend.web.dto.response.EmployeeResponseDto;

@Mapper
public interface EmployeeMapper {

    EmployeeMapper INSTANCE = Mappers.getMapper(EmployeeMapper.class);

    Employee employeeCreateDtoToEmployee(EmployeeCreateDto employeeCreateDto);

    EmployeeResponseDto employeeToEmployeeResponseDto(Employee employee);
}
