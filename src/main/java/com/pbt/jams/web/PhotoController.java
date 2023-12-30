package com.pbt.jams.web;

import com.pbt.jams.model.*;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import org.apache.commons.io.FileUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.bind.ServletRequestDataBinder;

import jakarta.validation.Valid;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.support.ByteArrayMultipartFileEditor;

import java.io.*;
import java.net.URI;
import java.net.URISyntaxException;
import java.net.URLConnection;
import java.nio.charset.StandardCharsets;
import java.security.Principal;
import java.util.*;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api")
class PhotoController {

    private final Logger log = LoggerFactory.getLogger(PhotoController.class);
    private PhotoRepository photoRepository;
    private UserRepository userRepository;

    public PhotoController(PhotoRepository photoRepository, UserRepository userRepository) {
        this.photoRepository = photoRepository;
        this.userRepository = userRepository;
    }

    @InitBinder
    protected void initBinder(HttpServletRequest request, ServletRequestDataBinder binder)
            throws ServletException {

        // Convert multipart object to byte[]
        binder.registerCustomEditor(byte[].class, new ByteArrayMultipartFileEditor());
    }

    @GetMapping("/photos")
    Collection<Photo> photos(Principal principal) {
        return photoRepository.findAllByUserId(principal.getName());
    }

    @GetMapping("/photo/{id}")
    ResponseEntity<?> getPhoto(@PathVariable Long id) {
        log.info("Request to /photo/{id}");
        Optional<Photo> photo = photoRepository.findById(id);
        return photo.map(response -> ResponseEntity.ok().body(response))
                .orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @GetMapping("/images/{dirId}/{fileId}")
    public ResponseEntity<byte[]> getImage(@PathVariable String dirId, @PathVariable String fileId) throws IOException {
        log.info("Request to /images/{id}/{file}");
        String filePath = "./images/" + dirId + "/" + fileId;
        log.info("filePath: " + filePath);

        byte[] imageAsByteArray = FileUtils.readFileToByteArray(new File(filePath));
        String fileName = new File(filePath).getName();
        String contentType = URLConnection.guessContentTypeFromStream(new ByteArrayInputStream(imageAsByteArray));

        HttpHeaders headers = new HttpHeaders();
        headers.add("Content-Type", contentType);
        headers.add("Content-Disposition",
                "attachment; filename=\"%s\"".formatted(fileName));

        return ResponseEntity
                .status(HttpStatus.OK)
                .headers(headers)
                .body(imageAsByteArray);
    }

    @GetMapping("/thumbnails/{dirId}/{fileId}")
    public ResponseEntity<byte[]> getThumbnail(@PathVariable String dirId, @PathVariable String fileId) throws IOException {
        log.info("Request to /thumbnails/{id}/{file}");
        String filePath = "./thumbnails/" + dirId + "/" + fileId;
        log.info("filePath: " + filePath);

        byte[] imageAsByteArray = FileUtils.readFileToByteArray(new File(filePath));
        String fileName = new File(filePath).getName();
        String contentType = URLConnection.guessContentTypeFromStream(new ByteArrayInputStream(imageAsByteArray));

        HttpHeaders headers = new HttpHeaders();
        headers.add("Content-Type", contentType);
        headers.add("Content-Disposition",
                "attachment; filename=\"%s\"".formatted(fileName));

        return ResponseEntity
                .status(HttpStatus.OK)
                .headers(headers)
                .body(imageAsByteArray);
    }

    @PostMapping("/photo")
    ResponseEntity<Photo> createPhoto(@Valid @ModelAttribute Photo photo,
                                      @AuthenticationPrincipal OAuth2User principal) throws URISyntaxException {
        log.info("Request to create photo: {}", photo.getDescription());
        Map<String, Object> details = principal.getAttributes();
        String userId = details.get("sub").toString();

        // check to see if user already exists
        Optional<User> user = userRepository.findById(userId);
        photo.setUser(user.orElse(new User(userId,
                details.get("name").toString(), details.get("email").toString(), null, null)));
        photo.setPhotoUUID(UUID.randomUUID());
        photo.setLocation(photo.createLocation());
        photo.setApiUrl(photo.createApiUrl());
        photo.setThumbnailLocation(photo.createThumbnailLocation());
        photo.setThumbnailApiUrl(photo.createThumbnailApiUrl());

        //String s = new String(photo.getFile(), StandardCharsets.UTF_8);
        //log.info("Uploaded file name: {}", s);
        photo.saveImageToDisk();

        Photo result = photoRepository.save(photo);
        return ResponseEntity.created(new URI("/api/photo/" + result.getId()))
                .body(result);
    }

    @PutMapping("/photo/{id}")
    ResponseEntity<Photo> updatePhoto(@Valid @RequestBody Photo photo) {
        log.info("Request to update photo: {}", photo);
        Photo result = photoRepository.save(photo);
        return ResponseEntity.ok().body(result);
    }

    @DeleteMapping("/photo/{id}")
    public ResponseEntity<?> deletePhoto(@PathVariable Long id) {
        log.info("Request to delete photo: {}", id);
        photoRepository.deleteById(id);
        return ResponseEntity.ok().build();
    }

}