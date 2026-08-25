package com.resumeforge.service.docx;

import com.resumeforge.dto.request.*;
import com.resumeforge.dto.response.ResumeResponse;
import org.apache.poi.xwpf.usermodel.*;
import org.springframework.stereotype.Service;

import java.io.ByteArrayOutputStream;
import java.util.*;
import java.util.List;

@Service
public class DOCXGenerationService {

    public byte[] generateResumeDocx(ResumeResponse resume) {
        try (XWPFDocument doc = new XWPFDocument();
             ByteArrayOutputStream out = new ByteArrayOutputStream()) {

            PersonalInfoDto pi = resume.getPersonalInformation();

            // Name Header
            XWPFParagraph nameP = doc.createParagraph();
            nameP.setAlignment(ParagraphAlignment.CENTER);
            nameP.setSpacingAfter(60);
            XWPFRun nameRun = nameP.createRun();
            nameRun.setText(pi != null && pi.getFullName() != null ? pi.getFullName() : "Your Name");
            nameRun.setBold(true);
            nameRun.setFontSize(18);
            nameRun.setFontFamily("Calibri");

            // Title
            if (pi != null && pi.getProfessionalTitle() != null && !pi.getProfessionalTitle().isBlank()) {
                XWPFParagraph titleP = doc.createParagraph();
                titleP.setAlignment(ParagraphAlignment.CENTER);
                titleP.setSpacingAfter(60);
                XWPFRun titleRun = titleP.createRun();
                titleRun.setText(pi.getProfessionalTitle());
                titleRun.setBold(true);
                titleRun.setColor("1E40AF");
                titleRun.setFontSize(12);
                titleRun.setFontFamily("Calibri");
            }

            // Contact Info
            List<String> contacts = new ArrayList<>();
            if (pi != null) {
                if (pi.getEmail() != null && !pi.getEmail().isBlank()) contacts.add(pi.getEmail());
                if (pi.getPhone() != null && !pi.getPhone().isBlank()) contacts.add(pi.getPhone());
                if (pi.getLocation() != null && !pi.getLocation().isBlank()) contacts.add(pi.getLocation());
                if (pi.getLinkedin() != null && !pi.getLinkedin().isBlank()) contacts.add("LinkedIn: " + pi.getLinkedin());
                if (pi.getGithub() != null && !pi.getGithub().isBlank()) contacts.add("GitHub: " + pi.getGithub());
            }

            if (!contacts.isEmpty()) {
                XWPFParagraph contactP = doc.createParagraph();
                contactP.setAlignment(ParagraphAlignment.CENTER);
                contactP.setSpacingAfter(140);
                XWPFRun contactRun = contactP.createRun();
                contactRun.setText(String.join(" | ", contacts));
                contactRun.setFontSize(9);
                contactRun.setColor("4B5563");
                contactRun.setFontFamily("Calibri");
            }

            // Ordered Sections
            String orderStr = resume.getSectionOrder() != null ? resume.getSectionOrder() : "summary,skills,experience,projects,education,certifications,achievements,languages";
            String[] sections = orderStr.split(",");

            for (String sec : sections) {
                switch (sec.trim().toLowerCase()) {
                    case "summary" -> {
                        if (resume.getSummary() != null && !resume.getSummary().isBlank()) {
                            addHeading(doc, "PROFESSIONAL SUMMARY");
                            XWPFParagraph p = doc.createParagraph();
                            p.setSpacingAfter(100);
                            XWPFRun r = p.createRun();
                            r.setText(resume.getSummary().trim());
                            r.setFontSize(10);
                            r.setFontFamily("Calibri");
                        }
                    }
                    case "skills" -> {
                        if (resume.getSkills() != null && !resume.getSkills().isEmpty()) {
                            addHeading(doc, "TECHNICAL SKILLS");
                            Map<String, List<String>> byCat = new LinkedHashMap<>();
                            for (SkillDto s : resume.getSkills()) {
                                byCat.computeIfAbsent(s.getCategory() != null ? s.getCategory() : "Technical", k -> new ArrayList<>()).add(s.getName());
                            }
                            for (Map.Entry<String, List<String>> entry : byCat.entrySet()) {
                                XWPFParagraph p = doc.createParagraph();
                                p.setSpacingAfter(40);
                                XWPFRun rBold = p.createRun();
                                rBold.setBold(true);
                                rBold.setText("• " + entry.getKey() + ": ");
                                rBold.setFontSize(10);
                                rBold.setFontFamily("Calibri");

                                XWPFRun rVal = p.createRun();
                                rVal.setText(String.join(", ", entry.getValue()));
                                rVal.setFontSize(10);
                                rVal.setFontFamily("Calibri");
                            }
                        }
                    }
                    case "experience" -> {
                        if (resume.getExperience() != null && !resume.getExperience().isEmpty()) {
                            addHeading(doc, "WORK EXPERIENCE");
                            for (ExperienceDto exp : resume.getExperience()) {
                                XWPFParagraph titleP = doc.createParagraph();
                                titleP.setSpacingBefore(80);
                                titleP.setSpacingAfter(20);
                                XWPFRun tRun = titleP.createRun();
                                tRun.setBold(true);
                                tRun.setText((exp.getTitle() != null ? exp.getTitle() : "Position") + " - " + (exp.getCompany() != null ? exp.getCompany() : ""));
                                tRun.setFontSize(11);
                                tRun.setFontFamily("Calibri");

                                String dates = (exp.getStartDate() != null ? exp.getStartDate() : "") + " – " +
                                        (Boolean.TRUE.equals(exp.getIsCurrent()) ? "Present" : (exp.getEndDate() != null ? exp.getEndDate() : "")) +
                                        (exp.getLocation() != null && !exp.getLocation().isBlank() ? " | " + exp.getLocation() : "");

                                XWPFParagraph dateP = doc.createParagraph();
                                dateP.setSpacingAfter(40);
                                XWPFRun dRun = dateP.createRun();
                                dRun.setItalic(true);
                                dRun.setColor("6B7280");
                                dRun.setText(dates);
                                dRun.setFontSize(9);
                                dRun.setFontFamily("Calibri");

                                if (exp.getResponsibilities() != null && !exp.getResponsibilities().isBlank()) {
                                    String[] lines = exp.getResponsibilities().split("\n");
                                    for (String line : lines) {
                                        String clean = line.replaceAll("^[•\\-*\\s]+", "").trim();
                                        if (clean.isEmpty()) continue;
                                        XWPFParagraph bp = doc.createParagraph();
                                        bp.setIndentationLeft(240);
                                        bp.setSpacingAfter(20);
                                        XWPFRun br = bp.createRun();
                                        br.setText("• " + clean);
                                        br.setFontSize(10);
                                        br.setFontFamily("Calibri");
                                    }
                                }
                            }
                        }
                    }
                    case "projects" -> {
                        if (resume.getProjects() != null && !resume.getProjects().isEmpty()) {
                            addHeading(doc, "KEY PROJECTS");
                            for (ProjectDto proj : resume.getProjects()) {
                                XWPFParagraph p = doc.createParagraph();
                                p.setSpacingBefore(60);
                                p.setSpacingAfter(20);
                                XWPFRun rTitle = p.createRun();
                                rTitle.setBold(true);
                                rTitle.setText(proj.getTitle() != null ? proj.getTitle() : "Project");
                                rTitle.setFontSize(11);
                                rTitle.setFontFamily("Calibri");

                                if (proj.getTechnologies() != null && !proj.getTechnologies().isBlank()) {
                                    XWPFRun rTech = p.createRun();
                                    rTech.setItalic(true);
                                    rTech.setColor("1E40AF");
                                    rTech.setText(" | " + proj.getTechnologies());
                                    rTech.setFontSize(9);
                                    rTech.setFontFamily("Calibri");
                                }

                                if (proj.getDescription() != null && !proj.getDescription().isBlank()) {
                                    XWPFParagraph descP = doc.createParagraph();
                                    descP.setIndentationLeft(240);
                                    descP.setSpacingAfter(20);
                                    XWPFRun rDesc = descP.createRun();
                                    rDesc.setText(proj.getDescription());
                                    rDesc.setFontSize(10);
                                    rDesc.setFontFamily("Calibri");
                                }
                            }
                        }
                    }
                    case "education" -> {
                        if (resume.getEducation() != null && !resume.getEducation().isEmpty()) {
                            addHeading(doc, "EDUCATION");
                            for (EducationDto edu : resume.getEducation()) {
                                XWPFParagraph p = doc.createParagraph();
                                p.setSpacingBefore(60);
                                p.setSpacingAfter(20);
                                XWPFRun r = p.createRun();
                                r.setBold(true);
                                String degreeStr = (edu.getDegree() != null ? edu.getDegree() : "") +
                                        (edu.getFieldOfStudy() != null ? " in " + edu.getFieldOfStudy() : "") +
                                        " — " + (edu.getInstitution() != null ? edu.getInstitution() : "");
                                r.setText(degreeStr);
                                r.setFontSize(10);
                                r.setFontFamily("Calibri");

                                String dates = (edu.getStartDate() != null ? edu.getStartDate() : "") + " – " + (edu.getEndDate() != null ? edu.getEndDate() : "");
                                if (edu.getGrade() != null && !edu.getGrade().isBlank()) {
                                    dates += " | Grade: " + edu.getGrade();
                                }
                                XWPFParagraph dp = doc.createParagraph();
                                dp.setSpacingAfter(40);
                                XWPFRun dr = dp.createRun();
                                dr.setItalic(true);
                                dr.setColor("6B7280");
                                dr.setText(dates);
                                dr.setFontSize(9);
                                dr.setFontFamily("Calibri");
                            }
                        }
                    }
                    case "certifications" -> {
                        if (resume.getCertifications() != null && !resume.getCertifications().isEmpty()) {
                            addHeading(doc, "CERTIFICATIONS");
                            for (CertificationDto cert : resume.getCertifications()) {
                                XWPFParagraph p = doc.createParagraph();
                                p.setSpacingAfter(30);
                                XWPFRun r = p.createRun();
                                r.setText("• " + cert.getName() + (cert.getIssuer() != null ? " — " + cert.getIssuer() : ""));
                                r.setFontSize(10);
                                r.setFontFamily("Calibri");
                            }
                        }
                    }
                }
            }

            doc.write(out);
            return out.toByteArray();
        } catch (Exception e) {
            throw new RuntimeException("Error generating DOCX resume: " + e.getMessage(), e);
        }
    }

    private void addHeading(XWPFDocument doc, String title) {
        XWPFParagraph p = doc.createParagraph();
        p.setSpacingBefore(140);
        p.setSpacingAfter(40);
        p.setBorderBottom(Borders.SINGLE);
        XWPFRun r = p.createRun();
        r.setText(title);
        r.setBold(true);
        r.setColor("1E3A8A");
        r.setFontSize(11);
        r.setFontFamily("Calibri");
    }
}
