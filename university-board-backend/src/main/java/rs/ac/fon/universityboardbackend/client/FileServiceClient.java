package rs.ac.fon.universityboardbackend.client;

import java.util.UUID;
import org.springframework.core.io.Resource;
import org.springframework.web.multipart.MultipartFile;

public interface FileServiceClient {

    UUID uploadFile(MultipartFile file, UUID folerUuid);

    Resource downloadFile(UUID folderUuid, UUID fileUuid);
}
