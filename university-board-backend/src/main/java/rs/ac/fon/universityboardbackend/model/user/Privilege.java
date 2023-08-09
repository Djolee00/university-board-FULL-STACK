package rs.ac.fon.universityboardbackend.model.user;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import lombok.experimental.Accessors;

@Getter
@Setter
@NoArgsConstructor
@Accessors(chain = true)
@Entity
@Table(name = "privilege")
public class Privilege {

    @Id
    @Enumerated(EnumType.STRING)
    @Column(name = "code")
    private PrivilegeCode code;

    @NotNull
    @Column(name = "name")
    private String name;

    @Getter
    @RequiredArgsConstructor
    private enum PrivilegeCode {
        ACCOUNT_C("Account creation"),
        ACCOUNT_W("Account modification"),
        ACCOUNT_R("Account read");

        private final String name;
    }
}
