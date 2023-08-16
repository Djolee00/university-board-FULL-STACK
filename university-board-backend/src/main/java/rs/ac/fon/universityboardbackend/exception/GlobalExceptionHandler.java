package rs.ac.fon.universityboardbackend.exception;

import jakarta.validation.ConstraintViolation;
import jakarta.validation.ConstraintViolationException;
import java.net.URI;
import java.time.Instant;
import java.util.HashSet;
import java.util.Set;
import java.util.stream.Collectors;
import org.springframework.http.HttpStatus;
import org.springframework.http.ProblemDetail;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.FieldError;
import org.springframework.validation.ObjectError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

@ControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(ResourceNotFoundException.class)
    ResponseEntity<ProblemDetail> onResourceNotFoundException(ResourceNotFoundException ex) {
        ProblemDetail problemDetail =
                ProblemDetail.forStatusAndDetail(HttpStatus.NOT_FOUND, ex.getMessage());
        problemDetail.setTitle("Requested resource doesn't exist");
        problemDetail.setType(createExceptionTypeUri(ex.getClass()));
        problemDetail.setProperty("timestamp", Instant.now());

        return new ResponseEntity<>(problemDetail, HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler(ValidationException.class)
    ResponseEntity<ProblemDetail> onValidationException(ValidationException ex) {
        ProblemDetail problemDetail =
                ProblemDetail.forStatusAndDetail(HttpStatus.BAD_REQUEST, ex.getMessage());
        problemDetail.setType(createExceptionTypeUri(ex.getClass()));
        problemDetail.setTitle("Invalid request");
        problemDetail.setProperty("timestamp", Instant.now());

        return new ResponseEntity<>(problemDetail, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(FileServiceException.class)
    ResponseEntity<ProblemDetail> onFileServiceException(FileServiceException ex) {
        ProblemDetail problemDetail =
                ProblemDetail.forStatusAndDetail(HttpStatus.INTERNAL_SERVER_ERROR, ex.getMessage());
        problemDetail.setTitle("File Service is temporarily unavailable");
        problemDetail.setType(createExceptionTypeUri(ex.getClass()));
        problemDetail.setProperty("timestamp", Instant.now());

        return new ResponseEntity<>(problemDetail, HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @ExceptionHandler(AccessDeniedException.class)
    ResponseEntity<ProblemDetail> onAccessDeniedException(AccessDeniedException ex) {
        ProblemDetail problemDetail =
                ProblemDetail.forStatusAndDetail(HttpStatus.FORBIDDEN, ex.getMessage());
        problemDetail.setTitle("You don't have privilege for this action");
        problemDetail.setType(createExceptionTypeUri(ex.getClass()));
        problemDetail.setProperty("timestamp", Instant.now());

        return new ResponseEntity<>(problemDetail, HttpStatus.FORBIDDEN);
    }

    @ExceptionHandler(MailServiceException.class)
    ResponseEntity<ProblemDetail> onMailServiceException(MailServiceException ex) {
        ProblemDetail problemDetail =
                ProblemDetail.forStatusAndDetail(HttpStatus.INTERNAL_SERVER_ERROR, ex.getMessage());
        problemDetail.setTitle("File Service is temporarily unavailable");
        problemDetail.setType(createExceptionTypeUri(ex.getClass()));
        problemDetail.setProperty("timestamp", Instant.now());

        return new ResponseEntity<>(problemDetail, HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<ProblemDetail> onMethodArgumentNotValidExceptionI(
            MethodArgumentNotValidException ex) {
        Set<Violation> violations = getViolations(ex);

        ProblemDetail problemDetail =
                ProblemDetail.forStatusAndDetail(
                        HttpStatus.UNPROCESSABLE_ENTITY, violations.toString());
        problemDetail.setType(createExceptionTypeUri(ex.getClass()));
        problemDetail.setTitle("Invalid request");
        problemDetail.setProperty("timestamp", Instant.now());
        problemDetail.setProperty("errors", violations);

        return new ResponseEntity<>(problemDetail, HttpStatus.UNPROCESSABLE_ENTITY);
    }

    @ExceptionHandler(ConstraintViolationException.class)
    public ResponseEntity<ProblemDetail> onConstraintViolationException(
            ConstraintViolationException ex) {
        Set<Violation> violations = getViolations(ex);

        ProblemDetail problemDetail =
                ProblemDetail.forStatusAndDetail(
                        HttpStatus.UNPROCESSABLE_ENTITY, violations.toString());
        problemDetail.setType(createExceptionTypeUri(ex.getClass()));
        problemDetail.setTitle("Invalid request");
        problemDetail.setProperty("timestamp", Instant.now());
        problemDetail.setProperty("errors", violations);

        return new ResponseEntity<>(problemDetail, HttpStatus.UNPROCESSABLE_ENTITY);
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<ProblemDetail> onUncaughtException(Exception ex) {
        ProblemDetail problemDetail =
                ProblemDetail.forStatusAndDetail(HttpStatus.INTERNAL_SERVER_ERROR, ex.getMessage());
        problemDetail.setType(createExceptionTypeUri(ex.getClass()));
        problemDetail.setTitle("Error occurred");
        problemDetail.setProperty("timestamp", Instant.now());

        return new ResponseEntity<>(problemDetail, HttpStatus.INTERNAL_SERVER_ERROR);
    }

    private record Violation(String field, String message) {}

    private static Set<Violation> getViolations(ConstraintViolationException ex) {
        Set<ConstraintViolation<?>> constraintViolations = ex.getConstraintViolations();
        return constraintViolations.stream()
                .map(
                        constraintViolation ->
                                new Violation(
                                        constraintViolation.getPropertyPath().toString(),
                                        constraintViolation.getMessage()))
                .collect(Collectors.toSet());
    }

    private static Set<Violation> getViolations(MethodArgumentNotValidException ex) {
        Set<Violation> violations = new HashSet<>();
        for (FieldError fieldError : ex.getBindingResult().getFieldErrors()) {
            Violation violation =
                    new Violation(fieldError.getField(), fieldError.getDefaultMessage());
            violations.add(violation);
        }

        for (ObjectError error : ex.getBindingResult().getGlobalErrors()) {
            Violation violation = new Violation(error.getCode(), error.getDefaultMessage());
            violations.add(violation);
        }
        return violations;
    }

    private static URI createExceptionTypeUri(Class<? extends Throwable> exceptionClass) {
        String namespace = "https://localhost:8080/exceptions/";
        String exceptionName = exceptionClass.getSimpleName();
        return URI.create(namespace + exceptionName);
    }
}
