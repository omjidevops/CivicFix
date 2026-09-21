package com.civicfix.dto;

import java.util.ArrayList;
import java.util.List;

/**
 * ============================================================================
 * CIVICFIX — DAY 48: REPUTATION SUMMARY DTO
 * Package: com.civicfix.dto
 * Class: ReputationSummaryDto
 *
 * Safe user-facing reputation overview for citizen profile and dashboard:
 * Includes current score, civic tier badge, and recent transaction history.
 * ============================================================================
 */
public class ReputationSummaryDto {

    private Integer reputationScore;
    private String tierTitle;
    private Long totalTransactions;
    private List<ReputationTransactionDto> recentTransactions = new ArrayList<>();

    public ReputationSummaryDto() {}

    public ReputationSummaryDto(Integer reputationScore, String tierTitle, Long totalTransactions, List<ReputationTransactionDto> recentTransactions) {
        this.reputationScore = reputationScore;
        this.tierTitle = tierTitle;
        this.totalTransactions = totalTransactions;
        this.recentTransactions = recentTransactions;
    }

    public Integer getReputationScore() {
        return reputationScore;
    }

    public void setReputationScore(Integer reputationScore) {
        this.reputationScore = reputationScore;
    }

    public String getTierTitle() {
        return tierTitle;
    }

    public void setTierTitle(String tierTitle) {
        this.tierTitle = tierTitle;
    }

    public Long getTotalTransactions() {
        return totalTransactions;
    }

    public void setTotalTransactions(Long totalTransactions) {
        this.totalTransactions = totalTransactions;
    }

    public List<ReputationTransactionDto> getRecentTransactions() {
        return recentTransactions;
    }

    public void setRecentTransactions(List<ReputationTransactionDto> recentTransactions) {
        this.recentTransactions = recentTransactions;
    }
}
