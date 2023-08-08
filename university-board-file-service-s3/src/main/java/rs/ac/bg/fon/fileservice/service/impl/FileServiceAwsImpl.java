package rs.ac.bg.fon.fileservice.service.impl;

import com.amazonaws.SdkClientException;
import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.model.*;
import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.Objects;
import java.util.UUID;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import rs.ac.bg.fon.fileservice.exceptions.FileDeletionException;
import rs.ac.bg.fon.fileservice.exceptions.FileDownloadException;
import rs.ac.bg.fon.fileservice.service.FileService;

@Service
@Slf4j
@RequiredArgsConstructor
public class FileServiceAwsImpl implements FileService {

    @Value("${aws.bucket.name}")
    private String bucketName;

    private final AmazonS3 s3Client;

    @Override
    public UUID uploadFile(MultipartFile multipartFile, UUID folderUuid) throws IOException {
        File file = new File(Objects.requireNonNull(multipartFile.getOriginalFilename()));
        try (FileOutputStream fileOutputStream = new FileOutputStream(file)) {
            fileOutputStream.write(multipartFile.getBytes());
        }

        UUID fileName = UUID.randomUUID();
        String folderPath = folderUuid.toString();

        String objectKey = folderPath + "/" + fileName;
        PutObjectRequest request = new PutObjectRequest(bucketName, objectKey, file);
        ObjectMetadata metadata = new ObjectMetadata();
        metadata.setContentType(multipartFile.getContentType());
        metadata.addUserMetadata("Title", multipartFile.getOriginalFilename());
        metadata.setContentLength(file.length());
        request.setMetadata(metadata);
        s3Client.putObject(request);

        file.delete();

        return fileName;
    }

    @Override
    public Object downloadFile(UUID folderUuid, UUID fileUuid)
            throws FileDownloadException, IOException {
        if (bucketIsEmpty()) {
            throw new FileDownloadException("Requested bucket does not exist or is empty");
        }

        String objectKey = folderUuid + "/" + fileUuid;
        S3Object object = s3Client.getObject(bucketName, objectKey);
        String localFileName = object.getObjectMetadata().getUserMetaDataOf("Title");
        try (S3ObjectInputStream s3is = object.getObjectContent()) {
            try (FileOutputStream fileOutputStream = new FileOutputStream(localFileName)) {
                byte[] read_buf = new byte[1024];
                int read_len;
                while ((read_len = s3is.read(read_buf)) > 0) {
                    fileOutputStream.write(read_buf, 0, read_len);
                }
            }
            Path pathObject = Paths.get(localFileName);
            Resource resource = new UrlResource(pathObject.toUri());

            if (resource.exists() || resource.isReadable()) {
                return resource;
            } else {
                throw new FileDownloadException("Could not find the file!");
            }
        }
    }

    @Override
    public boolean deleteFileLocally(String fileName) {
        File file = Paths.get(fileName).toFile();
        if (file.exists()) {
            file.delete();
            return true;
        }
        return false;
    }

    @Override
    public void deleteFile(UUID folderUuid, UUID fileUuid) throws FileDeletionException {
        String objectKey = folderUuid.toString() + "/" + fileUuid.toString();

        if (!s3Client.doesObjectExist(bucketName, objectKey)) {
            throw new FileDeletionException("File not found in the S3 bucket!");
        }

        try {
            s3Client.deleteObject(bucketName, objectKey);
        } catch (SdkClientException e) {
            throw new FileDeletionException("Error occurred while deleting the file!");
        }
    }

    private boolean bucketIsEmpty() {
        ListObjectsV2Result result = s3Client.listObjectsV2(this.bucketName);
        if (result == null) {
            return false;
        }
        List<S3ObjectSummary> objects = result.getObjectSummaries();
        return objects.isEmpty();
    }
}
