package rs.ac.bg.fon.fileservice.web.controller;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import java.io.IOException;
import java.util.*;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.io.FilenameUtils;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import rs.ac.bg.fon.fileservice.exceptions.FileDeletionException;
import rs.ac.bg.fon.fileservice.exceptions.FileDownloadException;
import rs.ac.bg.fon.fileservice.exceptions.FileUploadException;
import rs.ac.bg.fon.fileservice.service.FileService;
import rs.ac.bg.fon.fileservice.web.dto.APIResponse;

@RestController
@Slf4j
@RequestMapping("/api/v1/file")
@Validated
public class FileController {

    private final FileService fileService;

    public FileController(FileService fileUploadService) {
        this.fileService = fileUploadService;
    }

    @PostMapping("/upload")
    public ResponseEntity<?> uploadFile(
            @RequestParam("file") MultipartFile multipartFile,
            @RequestParam("folderUuid") UUID folderUuid,
            @RequestParam(value = "fileUuid", required = false) UUID fileUuid)
            throws FileUploadException, IOException {

        boolean isValidFile = isValidFile(multipartFile);
        List<String> allowedFileExtensions =
                new ArrayList<>(
                        Arrays.asList(
                                "pdf", "txt", "epub", "csv", "png", "jpg", "jpeg", "srt", "xlsx",
                                "docx", "rar", "zip", "pptx"));

        if (isValidFile
                && allowedFileExtensions.contains(
                        FilenameUtils.getExtension(multipartFile.getOriginalFilename()))) {
            UUID generatedUuid;
            if (fileUuid != null) {
                generatedUuid = fileService.uploadFile(multipartFile, folderUuid, fileUuid);
            } else {
                generatedUuid = fileService.uploadFile(multipartFile, folderUuid);
            }

            APIResponse apiResponse =
                    APIResponse.builder()
                            .message(
                                    "file uploaded successfully. File unique id =>" + generatedUuid)
                            .isSuccessful(true)
                            .statusCode(200)
                            .data(generatedUuid)
                            .build();
            return new ResponseEntity<>(apiResponse, HttpStatus.OK);
        } else {
            APIResponse apiResponse =
                    APIResponse.builder()
                            .message("Invalid File. File extension or File name is not supported")
                            .isSuccessful(false)
                            .statusCode(400)
                            .build();
            return new ResponseEntity<>(apiResponse, HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping("/download")
    public ResponseEntity<?> downloadFile(
            @RequestParam("fileUuid") @NotNull UUID fileUuid,
            @RequestParam("folderUuid") @NotNull UUID folderUuid)
            throws FileDownloadException, IOException {
        Object response = fileService.downloadFile(folderUuid, fileUuid);
        if (response != null) {
            Resource resource = (Resource) response;
            return ResponseEntity.ok()
                    .header(
                            HttpHeaders.CONTENT_DISPOSITION,
                            "attachment; filename=\"" + resource.getFilename() + "\"")
                    .body(response);
        } else {
            APIResponse apiResponse =
                    APIResponse.builder()
                            .message("File could not be downloaded")
                            .isSuccessful(false)
                            .statusCode(400)
                            .build();
            return new ResponseEntity<>(apiResponse, HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("/delete")
    public ResponseEntity<?> delete(
            @RequestParam(value = "folderUuid") @NotNull UUID folderUuid,
            @RequestParam(value = "fileUuid") @NotNull UUID fileUuid,
            @RequestParam(value = "fileName", required = false) String fileName)
            throws FileDeletionException {
        if (fileName != null) {
            fileService.deleteFileLocally(fileName);
        }
        fileService.deleteFile(folderUuid, fileUuid);
        APIResponse apiResponse =
                APIResponse.builder()
                        .message("File deleted!")
                        .isSuccessful(true)
                        .statusCode(200)
                        .build();
        return new ResponseEntity<>(apiResponse, HttpStatus.OK);
    }

    @DeleteMapping("/delete-local")
    public ResponseEntity<?> delete(@RequestParam("fileName") @NotBlank @NotNull String fileName) {
        boolean isDeleted = fileService.deleteFileLocally(fileName);
        if (isDeleted) {
            APIResponse apiResponse =
                    APIResponse.builder()
                            .isSuccessful(true)
                            .message("file deleted!")
                            .statusCode(200)
                            .build();
            return new ResponseEntity<>(apiResponse, HttpStatus.OK);
        } else {
            APIResponse apiResponse =
                    APIResponse.builder()
                            .isSuccessful(false)
                            .message("file does not exist")
                            .statusCode(404)
                            .build();
            return new ResponseEntity<>(apiResponse, HttpStatus.NOT_FOUND);
        }
    }

    private boolean isValidFile(MultipartFile multipartFile) {
        log.info("Empty Status ==> {}", multipartFile.isEmpty());
        if (Objects.isNull(multipartFile.getOriginalFilename())) {
            return false;
        }
        return !multipartFile.getOriginalFilename().trim().isEmpty();
    }
}
