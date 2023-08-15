package rs.ac.fon.universityboardbackend.constraint;

import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;
import java.time.LocalDate;
import rs.ac.fon.universityboardbackend.web.dto.create.BoardCreateDto;

public class DatesMatchValidator implements ConstraintValidator<DatesConstraint, BoardCreateDto> {
    @Override
    public boolean isValid(
            BoardCreateDto boardCreateDto, ConstraintValidatorContext constraintValidatorContext) {
        LocalDate startDate = boardCreateDto.getStartDate();
        LocalDate endDate = boardCreateDto.getEndDate();

        if (startDate == null || endDate == null) {
            return true;
        }

        return startDate.isBefore(endDate);
    }
}
