package rs.ac.bg.fon.fileservice.service.impl;

import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.model.ObjectMetadata;
import com.amazonaws.services.s3.model.PutObjectRequest;
import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.Objects;
import java.util.UUID;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.io.FilenameUtils;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
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
        // convert multipart file  to a file
        File file = new File(Objects.requireNonNull(multipartFile.getOriginalFilename()));
        try (FileOutputStream fileOutputStream = new FileOutputStream(file)) {
            fileOutputStream.write(multipartFile.getBytes());
        }

        // generate file name
        UUID fileName = UUID.randomUUID();
        String folderPath = folderUuid.toString();

        // upload file
        String objectKey = folderPath + "/" + fileName;
        PutObjectRequest request = new PutObjectRequest(bucketName, objectKey, file);
        ObjectMetadata metadata = new ObjectMetadata();
        metadata.setContentType(
                "plain/" + FilenameUtils.getExtension(multipartFile.getOriginalFilename()));
        metadata.addUserMetadata("Title", multipartFile.getOriginalFilename());
        metadata.setContentLength(file.length());
        request.setMetadata(metadata);
        s3Client.putObject(request);

        // delete file
        file.delete();

        return fileName;
    }

    @Override
    public Object downloadFile(String fileName) throws FileDownloadException, IOException {
        return null;
    }

    @Override
    public boolean delete(String fileName) {
        return false;
    }
}
