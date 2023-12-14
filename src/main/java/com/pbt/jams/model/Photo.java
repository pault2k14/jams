package com.pbt.jams.model;

import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;

import java.awt.*;
import java.awt.image.BufferedImage;
import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.nio.file.Paths;
import java.nio.file.Files;

import net.coobird.thumbnailator.Thumbnails;
import org.apache.commons.io.FileUtils;
import org.slf4j.Logger;

import jakarta.persistence.*;
import jakarta.persistence.Transient;
import org.slf4j.LoggerFactory;

import javax.imageio.ImageIO;
import javax.imageio.ImageReader;
import javax.imageio.stream.ImageInputStream;
import java.io.File;
import java.util.Base64;
import java.util.UUID;

@Data
@NoArgsConstructor
@RequiredArgsConstructor
@Entity
@Table(name = "user_photo")
public class Photo {

    @Id @GeneratedValue private Long id;
    @NonNull private String description;
    private String title;
    private String yearTaken;
    @Transient private byte[] file;
    private String encodedFile;
    private String location;
    private String thumbnailLocation;
    private String apiUrl;
    private String thumbnailApiUrl;
    private UUID photoUUID;
    // static prevents JPA serialization, transient wasn't working.
    private static final Logger log = LoggerFactory.getLogger(Photo.class);

    @ManyToOne(cascade=CascadeType.PERSIST)
    private User user;

    @PostPersist
    public void saveImageToDisk() {
        try {
            File imageFile = new File(this.location);
            File thumbnailFile = new File(this.thumbnailLocation);
            thumbnailFile.getParentFile().mkdirs();

            FileUtils.writeByteArrayToFile(imageFile, this.file);
            Thumbnails.of(imageFile)
                    .size(160, 160)
                    .toFile(thumbnailFile);
            /*
            BufferedImage originalBufferedImage = ImageIO.read(new ByteArrayInputStream(this.file));

            Image scaledThumbnailImage = ImageIO.read(new ByteArrayInputStream(this.file))
                    .getScaledInstance(100, 100, BufferedImage.SCALE_SMOOTH);

            BufferedImage bimage = new BufferedImage(scaledThumbnailImage.getWidth(null), scaledThumbnailImage.getHeight(null), BufferedImage.TYPE_INT_ARGB);
            Graphics2D bGr = bimage.createGraphics();
            bGr.drawImage(scaledThumbnailImage, 100, 100, null);
            bGr.dispose();
            File thumbnail = new File(this.thumbnailLocation);
            thumbnail.getParentFile().mkdirs();
            ImageIO.write(bimage, "jpg", thumbnail);
            */

            /*
            BufferedImage buffered = new BufferedImage(100, 100, originalBufferedImage.getType());
            buffered.getGraphics().drawImage(scaledThumbnailImage, 100, 100 , null);
            File thumbnail = new File(this.thumbnailLocation);
            thumbnail.getParentFile().mkdirs();
            ImageIO.write(buffered, "jpeg", thumbnail);
            */
            /*
            BufferedImage bimage = new BufferedImage(img.getWidth(null), img.getHeight(null), BufferedImage.TYPE_INT_ARGB);
            Graphics2D bGr = bimage.createGraphics();
            bGr.drawImage(img, 0, 0, null);
            bGr.dispose();

             */

        } catch(IOException e) {
            log.info(e.getMessage().toString());
        }
    }

    @PostLoad
    public void loadImageFromDisk() {
        String filePath = "./images/" + this.user.getId() + "/" + this.id + ".png";
        try {
            byte[] fileContent = FileUtils.readFileToByteArray(new File(filePath));
            this.encodedFile = Base64.getEncoder().encodeToString(fileContent);
        } catch(IOException e) {
            log.info(e.getMessage().toString());
        }
    }

    public String createLocation() {
        return "./images/" + this.user.getId() + "/" + this.photoUUID;
    }

    public String createThumbnailLocation() {
        return "./thumbnails/" + this.user.getId() + "/" + this.photoUUID + ".JPEG";
    }

    public String createApiUrl() {
        return "api/images/" + this.user.getId() + "/" + this.photoUUID;
    }

    public String createThumbnailApiUrl() {
        return "api/thumbnails/" + this.user.getId() + "/" + this.photoUUID + ".JPEG";
    }

}