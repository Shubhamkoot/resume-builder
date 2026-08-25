package com.resumeforge.dto.request;

public class PersonalInfoDto {
    private Long id;
    private String fullName;
    private String professionalTitle;
    private String email;
    private String phone;
    private String location;
    private String linkedin;
    private String github;
    private String portfolio;
    private String photoUrl;

    public PersonalInfoDto() {}

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getFullName() { return fullName; }
    public void setFullName(String fullName) { this.fullName = fullName; }
    public String getProfessionalTitle() { return professionalTitle; }
    public void setProfessionalTitle(String professionalTitle) { this.professionalTitle = professionalTitle; }
    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }
    public String getPhone() { return phone; }
    public void setPhone(String phone) { this.phone = phone; }
    public String getLocation() { return location; }
    public void setLocation(String location) { this.location = location; }
    public String getLinkedin() { return linkedin; }
    public void setLinkedin(String linkedin) { this.linkedin = linkedin; }
    public String getGithub() { return github; }
    public void setGithub(String github) { this.github = github; }
    public String getPortfolio() { return portfolio; }
    public void setPortfolio(String portfolio) { this.portfolio = portfolio; }
    public String getPhotoUrl() { return photoUrl; }
    public void setPhotoUrl(String photoUrl) { this.photoUrl = photoUrl; }
}
