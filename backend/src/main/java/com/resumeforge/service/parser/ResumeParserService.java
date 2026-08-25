package com.resumeforge.service.parser;

import com.resumeforge.exception.BadRequestException;
import org.apache.pdfbox.pdmodel.PDDocument;
import org.apache.pdfbox.text.PDFTextStripper;
import org.apache.poi.xwpf.extractor.XWPFWordExtractor;
import org.apache.poi.xwpf.usermodel.XWPFDocument;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.InputStream;

@Service
public class ResumeParserService {

    public String extractTextFromFile(MultipartFile file) {
        if (file == null || file.isEmpty()) {
            throw new BadRequestException("Uploaded file is empty");
        }

        String fileName = file.getOriginalFilename();
        if (fileName == null) {
            throw new BadRequestException("Invalid file name");
        }

        String lowerName = fileName.toLowerCase();
        try (InputStream inputStream = file.getInputStream()) {
            if (lowerName.endsWith(".pdf")) {
                try (PDDocument document = PDDocument.load(inputStream)) {
                    PDFTextStripper stripper = new PDFTextStripper();
                    return stripper.getText(document);
                }
            } else if (lowerName.endsWith(".docx")) {
                try (XWPFDocument doc = new XWPFDocument(inputStream);
                     XWPFWordExtractor extractor = new XWPFWordExtractor(doc)) {
                    return extractor.getText();
                }
            } else if (lowerName.endsWith(".txt")) {
                return new String(file.getBytes());
            } else {
                throw new BadRequestException("Unsupported file type. Please upload a PDF or DOCX resume.");
            }
        } catch (BadRequestException bre) {
            throw bre;
        } catch (Exception e) {
            throw new RuntimeException("Failed to extract text from file: " + e.getMessage(), e);
        }
    }
}
