package com.resumeforge.service.pdf;

import com.lowagie.text.*;
import com.lowagie.text.pdf.*;
import com.lowagie.text.pdf.draw.LineSeparator;
import com.resumeforge.dto.request.*;
import com.resumeforge.dto.response.ResumeResponse;
import org.springframework.stereotype.Service;

import java.awt.Color;
import java.io.ByteArrayOutputStream;
import java.util.*;
import java.util.List;

@Service
public class PDFGenerationService {

    public byte[] generateResumePdf(ResumeResponse resume) {
        try (ByteArrayOutputStream out = new ByteArrayOutputStream()) {
            Document document = new Document(PageSize.A4, 36, 36, 36, 36);
            PdfWriter writer = PdfWriter.getInstance(document, out);
            writer.setPageEvent(new HeaderFooterPageEvent());

            document.open();

            String template = resume.getTemplate() != null ? resume.getTemplate() : "ATS_CLASSIC";
            Color primaryColor = getPrimaryColor(template);
            Color headerColor = getHeaderColor(template);

            // 1. Personal Information / Header
            renderHeader(document, resume, template, primaryColor, headerColor);

            // 2. Ordered Sections
            String orderStr = resume.getSectionOrder() != null ? resume.getSectionOrder() : "summary,skills,experience,projects,education,certifications,achievements,languages";
            String[] sections = orderStr.split(",");

            for (String section : sections) {
                switch (section.trim().toLowerCase()) {
                    case "summary" -> renderSummary(document, resume, primaryColor);
                    case "skills" -> renderSkills(document, resume, primaryColor);
                    case "experience" -> renderExperience(document, resume, primaryColor);
                    case "projects" -> renderProjects(document, resume, primaryColor);
                    case "education" -> renderEducation(document, resume, primaryColor);
                    case "certifications" -> renderCertifications(document, resume, primaryColor);
                    case "achievements" -> renderAchievements(document, resume, primaryColor);
                    case "languages" -> renderLanguages(document, resume, primaryColor);
                }
            }

            document.close();
            return out.toByteArray();
        } catch (Exception e) {
            throw new RuntimeException("Error generating PDF resume: " + e.getMessage(), e);
        }
    }

    private Color getPrimaryColor(String template) {
        return switch (template) {
            case "MODERN_PRO" -> new Color(30, 64, 175); // Royal Blue
            case "SOFTWARE_ENGINEER" -> new Color(15, 118, 110); // Teal
            case "CLOUD_DEVOPS" -> new Color(3, 105, 161); // Sky Slate
            case "MINIMAL" -> new Color(51, 65, 85); // Slate Gray
            case "FRESHER" -> new Color(67, 56, 202); // Indigo
            default -> new Color(17, 24, 39); // ATS Classic Dark Charcoal
        };
    }

    private Color getHeaderColor(String template) {
        return switch (template) {
            case "MODERN_PRO" -> new Color(15, 23, 42);
            case "SOFTWARE_ENGINEER" -> new Color(19, 78, 74);
            case "CLOUD_DEVOPS" -> new Color(12, 74, 110);
            case "MINIMAL" -> new Color(30, 41, 59);
            case "FRESHER" -> new Color(49, 46, 129);
            default -> new Color(0, 0, 0);
        };
    }

    private void renderHeader(Document doc, ResumeResponse resume, String template, Color primaryColor, Color headerColor) throws DocumentException {
        PersonalInfoDto pi = resume.getPersonalInformation();
        String name = pi != null && pi.getFullName() != null ? pi.getFullName() : "Your Name";
        String title = pi != null && pi.getProfessionalTitle() != null ? pi.getProfessionalTitle() : (resume.getTargetRole() != null ? resume.getTargetRole() : "");

        Font nameFont = FontFactory.getFont(FontFactory.HELVETICA_BOLD, 20, headerColor);
        Font titleFont = FontFactory.getFont(FontFactory.HELVETICA_BOLD, 12, primaryColor);
        Font contactFont = FontFactory.getFont(FontFactory.HELVETICA, 9.5f, Color.DARK_GRAY);

        Paragraph nameP = new Paragraph(name, nameFont);
        if (template.equals("ATS_CLASSIC") || template.equals("MINIMAL")) {
            nameP.setAlignment(Element.ALIGN_CENTER);
        }
        doc.add(nameP);

        if (!title.isBlank()) {
            Paragraph titleP = new Paragraph(title, titleFont);
            if (template.equals("ATS_CLASSIC") || template.equals("MINIMAL")) {
                titleP.setAlignment(Element.ALIGN_CENTER);
            }
            doc.add(titleP);
        }

        // Contact info line
        List<String> contacts = new ArrayList<>();
        if (pi != null) {
            if (pi.getEmail() != null && !pi.getEmail().isBlank()) contacts.add(pi.getEmail());
            if (pi.getPhone() != null && !pi.getPhone().isBlank()) contacts.add(pi.getPhone());
            if (pi.getLocation() != null && !pi.getLocation().isBlank()) contacts.add(pi.getLocation());
            if (pi.getLinkedin() != null && !pi.getLinkedin().isBlank()) contacts.add("LinkedIn: " + pi.getLinkedin());
            if (pi.getGithub() != null && !pi.getGithub().isBlank()) contacts.add("GitHub: " + pi.getGithub());
            if (pi.getPortfolio() != null && !pi.getPortfolio().isBlank()) contacts.add("Portfolio: " + pi.getPortfolio());
        }

        if (!contacts.isEmpty()) {
            Paragraph contactP = new Paragraph(String.join(" | ", contacts), contactFont);
            contactP.setSpacingBefore(3);
            contactP.setSpacingAfter(8);
            if (template.equals("ATS_CLASSIC") || template.equals("MINIMAL")) {
                contactP.setAlignment(Element.ALIGN_CENTER);
            }
            doc.add(contactP);
        }

        // Header Divider
        LineSeparator sep = new LineSeparator();
        sep.setLineColor(primaryColor);
        sep.setLineWidth(1.2f);
        doc.add(new Chunk(sep));
    }

    private void renderSectionHeader(Document doc, String title, Color primaryColor) throws DocumentException {
        Font headerFont = FontFactory.getFont(FontFactory.HELVETICA_BOLD, 12, primaryColor);
        Paragraph p = new Paragraph(title.toUpperCase(), headerFont);
        p.setSpacingBefore(10);
        p.setSpacingAfter(3);
        p.setKeepTogether(true);
        doc.add(p);

        LineSeparator sep = new LineSeparator();
        sep.setLineColor(new Color(220, 225, 230));
        sep.setLineWidth(0.8f);
        doc.add(new Chunk(sep));
    }

    private void renderSummary(Document doc, ResumeResponse resume, Color primaryColor) throws DocumentException {
        if (resume.getSummary() == null || resume.getSummary().isBlank()) return;

        renderSectionHeader(doc, "Professional Summary", primaryColor);
        Font font = FontFactory.getFont(FontFactory.HELVETICA, 9.5f, Color.BLACK);
        Paragraph p = new Paragraph(resume.getSummary().trim(), font);
        p.setSpacingBefore(4);
        p.setSpacingAfter(6);
        p.setLeading(13);
        doc.add(p);
    }

    private void renderSkills(Document doc, ResumeResponse resume, Color primaryColor) throws DocumentException {
        if (resume.getSkills() == null || resume.getSkills().isEmpty()) return;

        renderSectionHeader(doc, "Technical Skills", primaryColor);

        Map<String, List<String>> byCategory = new LinkedHashMap<>();
        for (SkillDto s : resume.getSkills()) {
            String cat = s.getCategory() != null ? s.getCategory() : "Technical";
            byCategory.computeIfAbsent(cat, k -> new ArrayList<>()).add(s.getName());
        }

        Font boldFont = FontFactory.getFont(FontFactory.HELVETICA_BOLD, 9.5f, Color.BLACK);
        Font regFont = FontFactory.getFont(FontFactory.HELVETICA, 9.5f, Color.DARK_GRAY);

        for (Map.Entry<String, List<String>> entry : byCategory.entrySet()) {
            Paragraph p = new Paragraph();
            p.setSpacingBefore(2);
            p.setSpacingAfter(2);
            p.add(new Chunk("• " + entry.getKey() + ": ", boldFont));
            p.add(new Chunk(String.join(", ", entry.getValue()), regFont));
            doc.add(p);
        }
    }

    private void renderExperience(Document doc, ResumeResponse resume, Color primaryColor) throws DocumentException {
        if (resume.getExperience() == null || resume.getExperience().isEmpty()) return;

        renderSectionHeader(doc, "Work Experience", primaryColor);

        Font titleFont = FontFactory.getFont(FontFactory.HELVETICA_BOLD, 10.5f, Color.BLACK);
        Font subFont = FontFactory.getFont(FontFactory.HELVETICA_OBLIQUE, 9.5f, Color.DARK_GRAY);
        Font bodyFont = FontFactory.getFont(FontFactory.HELVETICA, 9.5f, Color.BLACK);

        for (ExperienceDto exp : resume.getExperience()) {
            Paragraph header = new Paragraph();
            header.setSpacingBefore(6);
            header.setKeepTogether(true);
            header.add(new Chunk(exp.getTitle() != null ? exp.getTitle() : "Software Engineer", titleFont));
            header.add(new Chunk(" - " + (exp.getCompany() != null ? exp.getCompany() : ""), titleFont));

            String dates = (exp.getStartDate() != null ? exp.getStartDate() : "") + " – " +
                    (Boolean.TRUE.equals(exp.getIsCurrent()) ? "Present" : (exp.getEndDate() != null ? exp.getEndDate() : ""));
            if (exp.getLocation() != null && !exp.getLocation().isBlank()) {
                dates += " | " + exp.getLocation();
            }

            Paragraph sub = new Paragraph(dates, subFont);
            sub.setSpacingAfter(3);
            doc.add(header);
            doc.add(sub);

            if (exp.getResponsibilities() != null && !exp.getResponsibilities().isBlank()) {
                String[] lines = exp.getResponsibilities().split("\n");
                for (String line : lines) {
                    String clean = line.replaceAll("^[•\\-*\\s]+", "").trim();
                    if (clean.isEmpty()) continue;
                    Paragraph bp = new Paragraph("• " + clean, bodyFont);
                    bp.setIndentationLeft(10);
                    bp.setLeading(13);
                    bp.setSpacingAfter(2);
                    doc.add(bp);
                }
            }
        }
    }

    private void renderProjects(Document doc, ResumeResponse resume, Color primaryColor) throws DocumentException {
        if (resume.getProjects() == null || resume.getProjects().isEmpty()) return;

        renderSectionHeader(doc, "Key Projects", primaryColor);

        Font titleFont = FontFactory.getFont(FontFactory.HELVETICA_BOLD, 10.5f, Color.BLACK);
        Font techFont = FontFactory.getFont(FontFactory.HELVETICA_OBLIQUE, 9f, primaryColor);
        Font bodyFont = FontFactory.getFont(FontFactory.HELVETICA, 9.5f, Color.BLACK);

        for (ProjectDto proj : resume.getProjects()) {
            Paragraph p = new Paragraph();
            p.setSpacingBefore(5);
            p.setKeepTogether(true);
            p.add(new Chunk(proj.getTitle() != null ? proj.getTitle() : "Project", titleFont));
            if (proj.getTechnologies() != null && !proj.getTechnologies().isBlank()) {
                p.add(new Chunk(" | " + proj.getTechnologies(), techFont));
            }
            doc.add(p);

            if (proj.getDescription() != null && !proj.getDescription().isBlank()) {
                Paragraph desc = new Paragraph(proj.getDescription().trim(), bodyFont);
                desc.setIndentationLeft(10);
                desc.setSpacingAfter(2);
                desc.setLeading(13);
                doc.add(desc);
            }

            if (proj.getHighlights() != null && !proj.getHighlights().isBlank()) {
                String[] lines = proj.getHighlights().split("\n");
                for (String line : lines) {
                    String clean = line.replaceAll("^[•\\-*\\s]+", "").trim();
                    if (clean.isEmpty()) continue;
                    Paragraph bp = new Paragraph("• " + clean, bodyFont);
                    bp.setIndentationLeft(10);
                    bp.setLeading(13);
                    bp.setSpacingAfter(2);
                    doc.add(bp);
                }
            }
        }
    }

    private void renderEducation(Document doc, ResumeResponse resume, Color primaryColor) throws DocumentException {
        if (resume.getEducation() == null || resume.getEducation().isEmpty()) return;

        renderSectionHeader(doc, "Education", primaryColor);

        Font titleFont = FontFactory.getFont(FontFactory.HELVETICA_BOLD, 10f, Color.BLACK);
        Font subFont = FontFactory.getFont(FontFactory.HELVETICA, 9.5f, Color.DARK_GRAY);

        for (EducationDto edu : resume.getEducation()) {
            Paragraph p = new Paragraph();
            p.setSpacingBefore(4);
            p.setKeepTogether(true);
            String deg = (edu.getDegree() != null ? edu.getDegree() : "") +
                    (edu.getFieldOfStudy() != null && !edu.getFieldOfStudy().isBlank() ? " in " + edu.getFieldOfStudy() : "");
            p.add(new Chunk(deg, titleFont));
            p.add(new Chunk(" — " + (edu.getInstitution() != null ? edu.getInstitution() : ""), titleFont));

            String dates = (edu.getStartDate() != null ? edu.getStartDate() : "") + " – " + (edu.getEndDate() != null ? edu.getEndDate() : "");
            if (edu.getGrade() != null && !edu.getGrade().isBlank()) {
                dates += " | Score: " + edu.getGrade();
            }

            Paragraph sub = new Paragraph(dates, subFont);
            sub.setSpacingAfter(3);
            doc.add(p);
            doc.add(sub);
        }
    }

    private void renderCertifications(Document doc, ResumeResponse resume, Color primaryColor) throws DocumentException {
        if (resume.getCertifications() == null || resume.getCertifications().isEmpty()) return;

        renderSectionHeader(doc, "Certifications", primaryColor);
        Font bodyFont = FontFactory.getFont(FontFactory.HELVETICA, 9.5f, Color.BLACK);
        Font boldFont = FontFactory.getFont(FontFactory.HELVETICA_BOLD, 9.5f, Color.BLACK);

        for (CertificationDto c : resume.getCertifications()) {
            Paragraph p = new Paragraph();
            p.setSpacingBefore(2);
            p.setSpacingAfter(2);
            p.add(new Chunk("• " + c.getName(), boldFont));
            if (c.getIssuer() != null && !c.getIssuer().isBlank()) {
                p.add(new Chunk(" — " + c.getIssuer(), bodyFont));
            }
            if (c.getIssueDate() != null && !c.getIssueDate().isBlank()) {
                p.add(new Chunk(" (" + c.getIssueDate() + ")", bodyFont));
            }
            doc.add(p);
        }
    }

    private void renderAchievements(Document doc, ResumeResponse resume, Color primaryColor) throws DocumentException {
        if (resume.getAchievements() == null || resume.getAchievements().isEmpty()) return;

        renderSectionHeader(doc, "Key Achievements & Awards", primaryColor);
        Font bodyFont = FontFactory.getFont(FontFactory.HELVETICA, 9.5f, Color.BLACK);
        Font boldFont = FontFactory.getFont(FontFactory.HELVETICA_BOLD, 9.5f, Color.BLACK);

        for (AchievementDto a : resume.getAchievements()) {
            Paragraph p = new Paragraph();
            p.setSpacingBefore(2);
            p.setSpacingAfter(2);
            p.add(new Chunk("• " + a.getTitle(), boldFont));
            if (a.getDescription() != null && !a.getDescription().isBlank()) {
                p.add(new Chunk(": " + a.getDescription(), bodyFont));
            }
            doc.add(p);
        }
    }

    private void renderLanguages(Document doc, ResumeResponse resume, Color primaryColor) throws DocumentException {
        if (resume.getLanguages() == null || resume.getLanguages().isEmpty()) return;

        renderSectionHeader(doc, "Languages", primaryColor);
        Font bodyFont = FontFactory.getFont(FontFactory.HELVETICA, 9.5f, Color.BLACK);

        List<String> items = new ArrayList<>();
        for (LanguageDto l : resume.getLanguages()) {
            items.add(l.getName() + (l.getProficiency() != null ? " (" + l.getProficiency() + ")" : ""));
        }
        Paragraph p = new Paragraph(String.join("  •  ", items), bodyFont);
        p.setSpacingBefore(3);
        doc.add(p);
    }

    // Page Number Footer Event
    private static class HeaderFooterPageEvent extends PdfPageEventHelper {
        @Override
        public void onEndPage(PdfWriter writer, Document document) {
            PdfContentByte cb = writer.getDirectContent();
            Phrase footer = new Phrase(String.format("AI ResumeForge  |  Page %d", writer.getPageNumber()),
                    FontFactory.getFont(FontFactory.HELVETICA, 8, Color.GRAY));
            ColumnText.showTextAligned(cb, Element.ALIGN_RIGHT,
                    footer,
                    document.right(),
                    document.bottom() - 15, 0);
        }
    }
}
