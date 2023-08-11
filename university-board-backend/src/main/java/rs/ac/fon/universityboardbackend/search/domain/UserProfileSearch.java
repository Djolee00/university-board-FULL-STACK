package rs.ac.fon.universityboardbackend.search.domain;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.Accessors;

@NoArgsConstructor
@Getter
@Setter
@Accessors(chain = true)
public class UserProfileSearch {
    private String email;
    private String password;
}
