package rs.ac.fon.universityboardbackend.web.dto.response;

import lombok.*;

@Getter
@NoArgsConstructor
@Setter
public class FileServiceResponse {
    private String message;
    private boolean isSuccessful;
    private int statusCode;
    private Object data;
}
