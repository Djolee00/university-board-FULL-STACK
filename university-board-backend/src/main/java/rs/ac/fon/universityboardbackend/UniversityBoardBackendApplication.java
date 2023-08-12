package rs.ac.fon.universityboardbackend;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration;

@SpringBootApplication(exclude = {SecurityAutoConfiguration.class})
public class UniversityBoardBackendApplication {

    public static void main(String[] args) {
        SpringApplication.run(UniversityBoardBackendApplication.class, args);
    }
}
