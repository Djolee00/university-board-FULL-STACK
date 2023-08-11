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
@Accessors(fluent = true, chain = true)
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
    public enum PrivilegeCode {
        ACCOUNT_C("Account Create"),
        ACCOUNT_W("Account Write"),
        ACCOUNT_R("Account Read"),
        BOARD_C("Board Create"),
        BOARD_W("Board Write"),
        BOARD_R("Board Read"),
        FILE_D("File Delete"),
        FILE_DOWN("File Download"),
        FILE_UP("File Upload"),
        COMMENT_D("Delete Comment"),
        COMMENT_R("Read Comments"),
        COMMENT_W("Write Comment");
        private final String description;
    }
}
