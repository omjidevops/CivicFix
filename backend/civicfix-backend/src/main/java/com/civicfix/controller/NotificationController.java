package com.civicfix.controller;

import com.civicfix.entity.Notification;
import com.civicfix.entity.User;
import com.civicfix.repository.NotificationRepository;
import com.civicfix.security.CustomUserDetails;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * ============================================================================
 * CIVICFIX — NOTIFICATIONS REST CONTROLLER
 * Package: com.civicfix.controller
 * Class: NotificationController
 *
 * Exposes notifications endpoints for authenticated users:
 * - GET /api/notifications: Fetch all alerts for logged-in citizen or officer
 * - PATCH /api/notifications/{id}/read: Mark alert as read
 * ============================================================================
 */
@RestController
@RequestMapping("/api/notifications")
public class NotificationController {

    private final NotificationRepository notificationRepository;

    public NotificationController(NotificationRepository notificationRepository) {
        this.notificationRepository = notificationRepository;
    }

    /**
     * Fetch user notifications
     * GET /api/notifications
     */
    @GetMapping
    public ResponseEntity<List<Notification>> getMyNotifications(
            @AuthenticationPrincipal CustomUserDetails userDetails
    ) {
        if (userDetails == null || userDetails.getUser() == null) {
            return ResponseEntity.ok(List.of());
        }
        Long userId = userDetails.getUser().getId();
        List<Notification> list = notificationRepository.findByUserIdOrderByCreatedAtDesc(userId);
        return ResponseEntity.ok(list);
    }

    /**
     * Mark notification as read
     * PATCH /api/notifications/{id}/read
     */
    @PatchMapping("/{id}/read")
    public ResponseEntity<Notification> markAsRead(
            @PathVariable Long id,
            @AuthenticationPrincipal CustomUserDetails userDetails
    ) {
        return notificationRepository.findById(id)
                .map(n -> {
                    if (userDetails != null && userDetails.getUser() != null &&
                            n.getUserId().equals(userDetails.getUser().getId())) {
                        n.setRead(true);
                        return ResponseEntity.ok(notificationRepository.save(n));
                    }
                    return ResponseEntity.status(403).<Notification>build();
                })
                .orElse(ResponseEntity.notFound().build());
    }
}
