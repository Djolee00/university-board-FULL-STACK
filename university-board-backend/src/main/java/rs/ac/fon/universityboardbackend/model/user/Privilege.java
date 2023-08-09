package rs.ac.fon.universityboardbackend.model.user;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

public class Privilege {

    @Getter
    @RequiredArgsConstructor
    private enum PrivilegeCode {
        ACCOUNT_C("Account creation"),
        ACCOUNT_W("Account modification"),
        ACCOUNT_R("Account read");

        private final String name;
    }
}
