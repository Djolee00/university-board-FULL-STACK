package rs.ac.bg.fon.fileservice.service;

import java.io.IOException;
import java.util.UUID;
import org.springframework.web.multipart.MultipartFile;
import rs.ac.bg.fon.fileservice.exceptions.FileDownloadException;
import rs.ac.bg.fon.fileservice.exceptions.FileUploadException;

public interface FileService {

    UUID uploadFile(MultipartFile multipartFile, UUID folderUuid)
            throws FileUploadException, IOException;

    Object downloadFile(String fileName) throws FileDownloadException, IOException;

    boolean delete(String fileName);
}
