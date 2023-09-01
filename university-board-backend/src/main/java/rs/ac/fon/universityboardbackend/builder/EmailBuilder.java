package rs.ac.fon.universityboardbackend.builder;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import java.nio.charset.StandardCharsets;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.thymeleaf.TemplateEngine;
import org.thymeleaf.context.Context;

public class EmailBuilder {

    private final JavaMailSender javaMailSender;
    private final TemplateEngine templateEngine;
    private final Context context;

    private String to;
    private String subject;
    private String templateName;

    public EmailBuilder(JavaMailSender javaMailSender, TemplateEngine templateEngine) {
        this.javaMailSender = javaMailSender;
        this.templateEngine = templateEngine;
        this.context = new Context();
    }

    public EmailBuilder to(String to) {
        this.to = to;
        return this;
    }

    public EmailBuilder subject(String subject) {
        this.subject = subject;
        return this;
    }

    public EmailBuilder templateName(String templateName) {
        this.templateName = templateName;
        return this;
    }

    public EmailBuilder contextVariable(String name, Object value) {
        context.setVariable(name, value);
        return this;
    }

    public void send() throws MessagingException {
        String emailContent = templateEngine.process(templateName, context);

        MimeMessage message = javaMailSender.createMimeMessage();
        MimeMessageHelper helper =
                new MimeMessageHelper(
                        message,
                        MimeMessageHelper.MULTIPART_MODE_MIXED_RELATED,
                        StandardCharsets.UTF_8.name());

        helper.setTo(to);
        helper.setSubject(subject);
        helper.setText(emailContent, true);

        javaMailSender.send(message);
    }
}
