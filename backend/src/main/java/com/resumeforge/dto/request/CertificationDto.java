package com.resumeforge.dto.request;

public class CertificationDto {
    private Long id;
    private String name;
    private String issuer;
    private String issueDate;
    private String expirationDate;
    private String credentialUrl;
    private Integer sortOrder = 0;

    public CertificationDto() {}

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    public String getIssuer() { return issuer; }
    public void setIssuer(String issuer) { this.issuer = issuer; }
    public String getIssueDate() { return issueDate; }
    public void setIssueDate(String issueDate) { this.issueDate = issueDate; }
    public String getExpirationDate() { return expirationDate; }
    public void setExpirationDate(String expirationDate) { this.expirationDate = expirationDate; }
    public String getCredentialUrl() { return credentialUrl; }
    public void setCredentialUrl(String credentialUrl) { this.credentialUrl = credentialUrl; }
    public Integer getSortOrder() { return sortOrder; }
    public void setSortOrder(Integer sortOrder) { this.sortOrder = sortOrder; }
}
