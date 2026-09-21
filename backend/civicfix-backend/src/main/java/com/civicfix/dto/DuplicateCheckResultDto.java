package com.civicfix.dto;

import java.util.List;

public class DuplicateCheckResultDto {

    private boolean duplicateFound;
    private Long matchedComplaintId;
    private String matchedTitle;
    private Double distanceMeters;
    private String advisoryMessage;

    public DuplicateCheckResultDto() {
    }

    public DuplicateCheckResultDto(boolean duplicateFound, Long matchedComplaintId, String matchedTitle, Double distanceMeters, String advisoryMessage) {
        this.duplicateFound = duplicateFound;
        this.matchedComplaintId = matchedComplaintId;
        this.matchedTitle = matchedTitle;
        this.distanceMeters = distanceMeters;
        this.advisoryMessage = advisoryMessage;
    }

    public boolean isDuplicateFound() {
        return duplicateFound;
    }

    public void setDuplicateFound(boolean duplicateFound) {
        this.duplicateFound = duplicateFound;
    }

    public Long getMatchedComplaintId() {
        return matchedComplaintId;
    }

    public void setMatchedComplaintId(Long matchedComplaintId) {
        this.matchedComplaintId = matchedComplaintId;
    }

    public String getMatchedTitle() {
        return matchedTitle;
    }

    public void setMatchedTitle(String matchedTitle) {
        this.matchedTitle = matchedTitle;
    }

    public Double getDistanceMeters() {
        return distanceMeters;
    }

    public void setDistanceMeters(Double distanceMeters) {
        this.distanceMeters = distanceMeters;
    }

    public String getAdvisoryMessage() {
        return advisoryMessage;
    }

    public void setAdvisoryMessage(String advisoryMessage) {
        this.advisoryMessage = advisoryMessage;
    }
}
