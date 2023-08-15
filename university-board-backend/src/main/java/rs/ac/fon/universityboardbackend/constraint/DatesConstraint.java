package rs.ac.fon.universityboardbackend.constraint;

import jakarta.validation.Constraint;
import jakarta.validation.Payload;
import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

@Constraint(validatedBy = {DatesMatchValidator.class})
@Target({ElementType.TYPE})
@Retention(RetentionPolicy.RUNTIME)
public @interface DatesConstraint {

    String message() default "Invalid date request";

    Class<?>[] groups() default {};

    Class<? extends Payload>[] payload() default {};
}
