package rs.ac.fon.universityboardbackend.model.user;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import java.util.Objects;
import lombok.*;
import lombok.experimental.Accessors;

@Getter
@Setter
@Accessors(chain = true)
@Entity
@Table(name = "privilege")
public class Privilege {

    @Id
    @Enumerated(EnumType.STRING)
    @Column(name = "code")
    private PrivilegeCode code;

    @NotBlank
    @Column(name = "name")
    private String name;

    @Getter
    @RequiredArgsConstructor
    public enum PrivilegeCode {
        ACCOUNT_C("Account Create"),
        ACCOUNT_W("Account Write"),
        ACCOUNT_R("Account Read"),
        ACCOUNT_D("Account Delete"),
        BOARD_C("Board Create"),
        BOARD_W("Board Write"),
        BOARD_R("Board Read"),
        FILE_D("File Delete"),
        FILE_DOWN("File Download"),
        FILE_UP("File Upload"),
        COMMENT_D("Delete Comment"),
        COMMENT_W("Write Comment");
        private final String description;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Privilege privilege = (Privilege) o;
        return code == privilege.code && Objects.equals(name, privilege.name);
    }

    @Override
    public int hashCode() {
        return Objects.hash(code, name);
    }
}
