package rs.ac.fon.universityboardbackend.search.domain;

import lombok.Getter;
import lombok.Setter;
import lombok.experimental.Accessors;

@Getter
@Setter
@Accessors(chain = true)
public class UserProfileSearch {
    private String email;
    private String password;
}
