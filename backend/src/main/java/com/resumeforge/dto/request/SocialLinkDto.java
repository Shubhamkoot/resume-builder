package com.resumeforge.dto.request;

public class SocialLinkDto {
    private Long id;
    private String platform;
    private String url;
    private Integer sortOrder = 0;

    public SocialLinkDto() {}

    public SocialLinkDto(String platform, String url) {
        this.platform = platform;
        this.url = url;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getPlatform() { return platform; }
    public void setPlatform(String platform) { this.platform = platform; }
    public String getUrl() { return url; }
    public void setUrl(String url) { this.url = url; }
    public Integer getSortOrder() { return sortOrder; }
    public void setSortOrder(Integer sortOrder) { this.sortOrder = sortOrder; }
}
