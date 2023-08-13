package rs.ac.fon.universityboardbackend.client.impl;

import java.util.UUID;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.Resource;
import org.springframework.http.MediaType;
import org.springframework.http.client.MultipartBodyBuilder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.reactive.function.BodyInserters;
import org.springframework.web.reactive.function.client.WebClient;
import rs.ac.fon.universityboardbackend.client.FileServiceClient;
import rs.ac.fon.universityboardbackend.exception.FileServiceException;
import rs.ac.fon.universityboardbackend.web.dto.response.FileServiceResponse;

@Service
@Slf4j
public class FileServiceClientImpl implements FileServiceClient {

    private final WebClient webClient;

    public FileServiceClientImpl(@Value("${file.service.s3.base.url}") String baseUrl) {
        if (StringUtils.isBlank(baseUrl)) {
            log.error("Cannot configure SefClient. Sef url is empty");
            this.webClient = null;
            return;
        }

        this.webClient = WebClient.builder().baseUrl(baseUrl).build();
    }

    @Override
    public UUID uploadFile(MultipartFile file, UUID folerUuid) {
        MultipartBodyBuilder builder = new MultipartBodyBuilder();
        builder.part("file", file.getResource());
        builder.part("folderUuid", folerUuid.toString());

        try {
            FileServiceResponse response =
                    webClient
                            .post()
                            .uri("/upload")
                            .contentType(MediaType.MULTIPART_FORM_DATA)
                            .body(BodyInserters.fromMultipartData(builder.build()))
                            .retrieve()
                            .bodyToMono(FileServiceResponse.class)
                            .block();
            if (response != null && response.isSuccessful()) {
                return UUID.fromString((String) response.getData());
            } else {
                throw new FileServiceException("File Service encountered problem");
            }
        } catch (Exception e) {
            throw new FileServiceException("File Service encountered problem", e);
        }
    }

    @Override
    public Resource downloadFile(UUID folderUuid, UUID fileUuid) {
        try {
            return webClient
                    .get()
                    .uri(
                            uriBuilder ->
                                    uriBuilder
                                            .path("/download")
                                            .queryParam("fileUuid", fileUuid)
                                            .queryParam("folderUuid", folderUuid)
                                            .build())
                    .retrieve()
                    .bodyToMono(Resource.class)
                    .block();
        } catch (Exception e) {
            throw new FileServiceException("File Service encountered problem", e);
        }
    }
}
