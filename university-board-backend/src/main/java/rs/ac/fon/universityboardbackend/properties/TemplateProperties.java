package rs.ac.fon.universityboardbackend.properties;

import lombok.Getter;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

@Component
@Getter
public class TemplateProperties {

    private final String welcomeTemplateName;
    private final String boardWelcomeTemplateName;
    private final String newCommentTemplateName;
    private final String boardBeginningTemplateName;
    private final String commencementNotificationTemplate;

    public TemplateProperties(
            @Value("${email.welcome.template}") String welcomeTemplate,
            @Value("${board.welcome.template}") String boardWelcomeTemplate,
            @Value("${new.comment.template}") String newCommentTemplate,
            @Value("${board.beginning.template}") String boardBeginningTemplateName,
            @Value("${commencement.notification.template}")
                    String commencementNotificationTemplate) {
        this.welcomeTemplateName = welcomeTemplate;
        this.boardWelcomeTemplateName = boardWelcomeTemplate;
        this.newCommentTemplateName = newCommentTemplate;
        this.boardBeginningTemplateName = boardBeginningTemplateName;
        this.commencementNotificationTemplate = commencementNotificationTemplate;
    }
}
