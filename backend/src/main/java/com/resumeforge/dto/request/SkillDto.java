package com.resumeforge.dto.request;

public class SkillDto {
    private Long id;
    private String name;
    private String category = "Technical";
    private String proficiencyLevel;
    private Integer sortOrder = 0;

    public SkillDto() {}

    public SkillDto(String name, String category) {
        this.name = name;
        this.category = category;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    public String getCategory() { return category; }
    public void setCategory(String category) { this.category = category; }
    public String getProficiencyLevel() { return proficiencyLevel; }
    public void setProficiencyLevel(String proficiencyLevel) { this.proficiencyLevel = proficiencyLevel; }
    public Integer getSortOrder() { return sortOrder; }
    public void setSortOrder(Integer sortOrder) { this.sortOrder = sortOrder; }
}
