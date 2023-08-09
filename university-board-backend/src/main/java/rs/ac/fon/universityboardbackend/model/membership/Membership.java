package rs.ac.fon.universityboardbackend.model.membership;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

public class Membership {

    @Getter
    @RequiredArgsConstructor
    private enum MembershipStatus {
        ACTIVE("Active"),
        ON_LEAVE("On leave"),
        PROBATION("Probation");

        private final String status;
    }
}
