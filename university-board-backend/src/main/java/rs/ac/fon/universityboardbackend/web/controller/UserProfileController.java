package rs.ac.fon.universityboardbackend.web.controller;

import jakarta.validation.Valid;
import java.util.UUID;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import rs.ac.fon.universityboardbackend.model.user.UserProfile;
import rs.ac.fon.universityboardbackend.service.UserProfileService;
import rs.ac.fon.universityboardbackend.web.dto.patch.UserProfilePatchDto;

@RestController
@RequestMapping("/user-profiles")
@RequiredArgsConstructor
public class UserProfileController {

    private final UserProfileService userProfileService;

    @PatchMapping("/{uuid}")
    public ResponseEntity<Void> updatePassword(
            @PathVariable UUID uuid, @RequestBody @Valid UserProfilePatchDto userProfilePatchDto) {
        UserProfile userProfile = userProfileService.findByUuid(uuid);
        userProfileService.updatePassword(
                userProfile, userProfilePatchDto.oldPassword(), userProfilePatchDto.newPassword());
        return ResponseEntity.ok().build();
    }
}
