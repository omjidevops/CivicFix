package com.civicfix.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.net.MalformedURLException;
import java.nio.file.*;
import java.util.Arrays;
import java.util.List;
import java.util.UUID;

/**
 * ============================================================================
 * CIVICFIX — DAY 42: SECURE FILE STORAGE SERVICE
 * Package: com.civicfix.service
 * Class: FileStorageService
 *
 * Security Protections:
 * 1. Extension Allowlisting (jpg, jpeg, png, webp)
 * 2. MIME Content-Type Validation (image/jpeg, image/png, image/webp)
 * 3. Path Traversal Prevention (Generates randomized UUID filenames)
 * 4. Size Enforced by Spring Boot (5MB max)
 * ============================================================================
 */
@Service
public class FileStorageService {

    private final Path fileStorageLocation;

    private static final List<String> ALLOWED_EXTENSIONS = Arrays.asList("jpg", "jpeg", "png", "webp");
    private static final List<String> ALLOWED_MIME_TYPES = Arrays.asList("image/jpeg", "image/png", "image/webp");

    public FileStorageService(@Value("${app.upload.dir:uploads}") String uploadDir) {
        this.fileStorageLocation = Paths.get(uploadDir).toAbsolutePath().normalize();
        try {
            Files.createDirectories(this.fileStorageLocation);
        } catch (IOException ex) {
            throw new RuntimeException("Could not initialize upload storage directory: " + uploadDir, ex);
        }
    }

    /**
     * Validates and saves an uploaded MultipartFile to local disk storage.
     * Returns the safe generated filename.
     */
    public String storeFile(MultipartFile file) {
        if (file == null || file.isEmpty()) {
            throw new IllegalArgumentException("Cannot store empty file.");
        }

        // 1. Validate MIME Content-Type
        String contentType = file.getContentType();
        if (contentType == null || !ALLOWED_MIME_TYPES.contains(contentType.toLowerCase())) {
            throw new IllegalArgumentException("Invalid file type: " + contentType + ". Only JPEG, PNG, and WebP images are permitted.");
        }

        // 2. Validate and Extract File Extension
        String originalFilename = StringUtils.cleanPath(file.getOriginalFilename() != null ? file.getOriginalFilename() : "image.jpg");
        String extension = "";
        int dotIndex = originalFilename.lastIndexOf('.');
        if (dotIndex > 0 && dotIndex < originalFilename.length() - 1) {
            extension = originalFilename.substring(dotIndex + 1).toLowerCase();
        }

        if (!ALLOWED_EXTENSIONS.contains(extension)) {
            throw new IllegalArgumentException("Invalid extension (." + extension + "). Permitted extensions: " + ALLOWED_EXTENSIONS);
        }

        // 3. Security: Generate cryptographically random UUID filename to prevent Path Traversal and collisions
        String safeFileName = UUID.randomUUID().toString() + "." + extension;

        try {
            Path targetLocation = this.fileStorageLocation.resolve(safeFileName);
            Files.copy(file.getInputStream(), targetLocation, StandardCopyOption.REPLACE_EXISTING);
            return safeFileName;
        } catch (IOException ex) {
            throw new RuntimeException("Could not store file " + safeFileName + ". Please try again.", ex);
        }
    }

    /**
     * Loads a file from disk as a Spring Resource for browser viewing.
     */
    public Resource loadFileAsResource(String filename) {
        try {
            Path filePath = this.fileStorageLocation.resolve(filename).normalize();

            // Guard against path traversal attempt (e.g., ../../etc/passwd)
            if (!filePath.startsWith(this.fileStorageLocation)) {
                throw new SecurityException("Access denied: File outside storage directory.");
            }

            Resource resource = new UrlResource(filePath.toUri());
            if (resource.exists() && resource.isReadable()) {
                return resource;
            } else {
                throw new RuntimeException("File not found: " + filename);
            }
        } catch (MalformedURLException ex) {
            throw new RuntimeException("File path malformed: " + filename, ex);
        }
    }
}
