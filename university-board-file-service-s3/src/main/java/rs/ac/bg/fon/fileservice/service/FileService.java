package rs.ac.bg.fon.fileservice.service;

import java.io.IOException;
import java.util.UUID;
import org.springframework.web.multipart.MultipartFile;
import rs.ac.bg.fon.fileservice.exceptions.FileDeletionException;
import rs.ac.bg.fon.fileservice.exceptions.FileDownloadException;
import rs.ac.bg.fon.fileservice.exceptions.FileUploadException;

public interface FileService {

    UUID uploadFile(MultipartFile multipartFile, UUID folderUuid)
            throws FileUploadException, IOException;

    Object downloadFile(UUID folderUuid, UUID fileUuid) throws FileDownloadException, IOException;

    void deleteFile(UUID folderUuid, UUID fileUuid) throws FileDeletionException;

    boolean deleteFileLocally(String fileName);
}
