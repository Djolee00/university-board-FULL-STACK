package rs.ac.fon.universityboardbackend.web.controller;

import jakarta.validation.Valid;
import java.util.UUID;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import rs.ac.fon.universityboardbackend.model.user.UserProfile;
import rs.ac.fon.universityboardbackend.service.AuthorizationService;
import rs.ac.fon.universityboardbackend.service.UserProfileService;
import rs.ac.fon.universityboardbackend.web.dto.patch.UserProfilePatchDto;

@RestController
@RequestMapping("/user-profiles")
public class UserProfileController extends AbstractController {

    public UserProfileController(
            AuthorizationService authorizationService, UserProfileService userProfileService) {
        super(authorizationService, userProfileService);
    }

    @PatchMapping("/{uuid}")
    public ResponseEntity<Void> updatePassword(
            @PathVariable UUID uuid, @RequestBody @Valid UserProfilePatchDto userProfilePatchDto) {
        UserProfile userProfile = userProfileService.findByUuid(uuid);
        userProfileService.updatePassword(
                userProfile, userProfilePatchDto.oldPassword(), userProfilePatchDto.newPassword());
        return ResponseEntity.ok().build();
    }
}
