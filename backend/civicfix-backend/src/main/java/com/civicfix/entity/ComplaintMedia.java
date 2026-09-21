package com.civicfix.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;

/**
 * ============================================================================
 * CIVICFIX — DAY 42: COMPLAINT MEDIA JPA ENTITY
 * Package: com.civicfix.entity
 * Class: ComplaintMedia
 *
 * Maps to database table "complaint_media".
 * Stores photographic and documentary proof metadata linked to complaints.
 * Binary bytes are stored on the local filesystem / storage bucket.
 * ============================================================================
 */
@Entity
@Table(name = "complaint_media")
public class ComplaintMedia {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "complaint_id", nullable = false)
    private Long complaintId;

    @Column(name = "file_url", nullable = false, length = 500)
    private String fileUrl;

    @Column(name = "file_type", length = 20)
    private String fileType = "IMAGE"; // IMAGE, VIDEO, DOCUMENT

    @Column(name = "created_at", updatable = false)
    private LocalDateTime createdAt;

    public ComplaintMedia() {}

    public ComplaintMedia(Long complaintId, String fileUrl, String fileType) {
        this.complaintId = complaintId;
        this.fileUrl = fileUrl;
        this.fileType = fileType != null ? fileType : "IMAGE";
    }

    @PrePersist
    protected void onCreate() {
        this.createdAt = LocalDateTime.now();
        if (this.fileType == null) {
            this.fileType = "IMAGE";
        }
    }

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public Long getComplaintId() { return complaintId; }
    public void setComplaintId(Long complaintId) { this.complaintId = complaintId; }

    public String getFileUrl() { return fileUrl; }
    public void setFileUrl(String fileUrl) { this.fileUrl = fileUrl; }

    public String getFileType() { return fileType; }
    public void setFileType(String fileType) { this.fileType = fileType; }

    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
}
