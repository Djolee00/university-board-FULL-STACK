package rs.ac.fon.universityboardbackend.model.employee;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum AcademicTitle {
    PROFESSOR("Professor"),
    ASSOCIATE_PROFESSOR("Associate Professor"),
    ASSISTANT_PROFESSOR("Assistant Professor"),
    LECTURER("Lecturer"),
    INSTRUCTOR("Instructor"),
    RESEARCHER("Researcher"),
    DOCTORAL_CANDIDATE("Doctoral Candidate"),
    POSTDOCTORAL_FELLOW("Postdoctoral Fellow"),
    ADJUNCT_PROFESSOR("Adjunct Professor"),
    VISITING_PROFESSOR("Visiting Professor"),
    EMERITUS_PROFESSOR("Emeritus Professor"),
    DEAN("Dean"),
    CHAIR("Chair"),
    LIBRARIAN("Librarian"),
    TUTOR("Tutor");

    private final String title;
}
