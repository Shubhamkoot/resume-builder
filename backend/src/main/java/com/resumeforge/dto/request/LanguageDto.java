package com.resumeforge.dto.request;

public class LanguageDto {
    private Long id;
    private String name;
    private String proficiency;
    private Integer sortOrder = 0;

    public LanguageDto() {}

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    public String getProficiency() { return proficiency; }
    public void setProficiency(String proficiency) { this.proficiency = proficiency; }
    public Integer getSortOrder() { return sortOrder; }
    public void setSortOrder(Integer sortOrder) { this.sortOrder = sortOrder; }
}
