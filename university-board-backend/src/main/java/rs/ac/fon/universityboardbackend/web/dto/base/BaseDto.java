package rs.ac.fon.universityboardbackend.web.dto.base;

import com.fasterxml.jackson.annotation.JsonInclude;
import java.io.Serializable;

@JsonInclude(JsonInclude.Include.NON_NULL)
public interface BaseDto extends Serializable {}
