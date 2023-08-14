package rs.ac.fon.universityboardbackend.util;

import java.util.Random;

public class PasswordGenerator {

    private static final String CHAR_LOWER = "abcdefghijklmnopqrstuvwxyz";
    private static final String CHAR_UPPER = CHAR_LOWER.toUpperCase();
    private static final String NUMBER = "0123456789";
    private static final String PASSWORD_ALLOW = CHAR_LOWER + CHAR_UPPER + NUMBER;

    private static final int PASSWORD_LENGTH = 6;

    private static final Random random = new Random();

    public static String generateRandomPassword() {
        StringBuilder password = new StringBuilder(PASSWORD_LENGTH);
        for (int i = 0; i < PASSWORD_LENGTH; i++) {
            int randomCharIndex = random.nextInt(PASSWORD_ALLOW.length());
            password.append(PASSWORD_ALLOW.charAt(randomCharIndex));
        }

        return password.toString();
    }
}
