package com.civicfix.controller;

import com.civicfix.entity.ComplaintMedia;
import com.civicfix.exception.ComplaintNotFoundException;
import com.civicfix.repository.ComplaintMediaRepository;
import com.civicfix.repository.ComplaintRepository;
import com.civicfix.service.FileStorageService;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.util.List;

/**
 * ============================================================================
 * CIVICFIX — DAY 42: MEDIA REST CONTROLLER
 * Package: com.civicfix.controller
 * Class: MediaController
 *
 * Exposes endpoints for uploading and serving photographic evidence:
 * - POST /api/complaints/{id}/media -> Uploads photo proof (Multipart)
 * - GET  /api/complaints/{id}/media -> Lists all photos attached to complaint
 * - GET  /api/media/{filename}      -> Streams image binary for browser display
 * ============================================================================
 */
@RestController
public class MediaController {

    private final FileStorageService fileStorageService;
    private final ComplaintMediaRepository complaintMediaRepository;
    private final ComplaintRepository complaintRepository;

    public MediaController(
            FileStorageService fileStorageService,
            ComplaintMediaRepository complaintMediaRepository,
            ComplaintRepository complaintRepository
    ) {
        this.fileStorageService = fileStorageService;
        this.complaintMediaRepository = complaintMediaRepository;
        this.complaintRepository = complaintRepository;
    }

    /**
     * Upload photographic proof for a complaint
     * POST /api/complaints/{id}/media
     */
    @PostMapping("/api/complaints/{id}/media")
    public ResponseEntity<ComplaintMedia> uploadMedia(
            @PathVariable Long id,
            @RequestParam("file") MultipartFile file
    ) {
        // 1. Verify complaint exists in database
        if (!complaintRepository.existsById(id)) {
            throw new ComplaintNotFoundException("Cannot attach media: Complaint ID " + id + " does not exist.");
        }

        // 2. Validate and store file on disk via storage abstraction
        String storedFilename = fileStorageService.storeFile(file);

        // 3. Construct accessible relative URL
        String fileUrl = "/api/media/" + storedFilename;

        // 4. Record metadata in complaint_media database table
        ComplaintMedia media = new ComplaintMedia(id, fileUrl, "IMAGE");
        ComplaintMedia saved = complaintMediaRepository.save(media);

        return new ResponseEntity<>(saved, HttpStatus.CREATED);
    }

    /**
     * Fetch all media attached to a complaint
     * GET /api/complaints/{id}/media
     */
    @GetMapping("/api/complaints/{id}/media")
    public ResponseEntity<List<ComplaintMedia>> getMediaForComplaint(@PathVariable Long id) {
        if (!complaintRepository.existsById(id)) {
            throw new ComplaintNotFoundException("Complaint ID " + id + " does not exist.");
        }
        return ResponseEntity.ok(complaintMediaRepository.findByComplaintId(id));
    }

    /**
     * Serve uploaded media resource directly to the browser
     * GET /api/media/{filename}
     */
    @GetMapping("/api/media/{filename:.+}")
    public ResponseEntity<Resource> serveMediaFile(@PathVariable String filename) {
        Resource resource = fileStorageService.loadFileAsResource(filename);

        String contentType = "application/octet-stream";
        try {
            contentType = Files.probeContentType(resource.getFile().toPath());
        } catch (IOException ignored) {}

        return ResponseEntity.ok()
                .contentType(MediaType.parseMediaType(contentType != null ? contentType : "image/jpeg"))
                .header(HttpHeaders.CONTENT_DISPOSITION, "inline; filename=\"" + resource.getFilename() + "\"")
                .body(resource);
    }
}
