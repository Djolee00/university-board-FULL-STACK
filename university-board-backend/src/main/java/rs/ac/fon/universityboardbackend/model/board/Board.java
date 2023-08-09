package rs.ac.fon.universityboardbackend.model.board;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

public class Board {

    @Getter
    @RequiredArgsConstructor
    private enum BoardStatus {
        PENDING("Pending"),
        ACTIVE("Active"),
        CLOSED("Closed"),
        EXPIRED("Expired");

        private final String status;
    }
}
