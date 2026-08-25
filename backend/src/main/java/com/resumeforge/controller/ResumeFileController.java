package com.resumeforge.controller;

import com.resumeforge.dto.response.ApiResponse;
import com.resumeforge.dto.response.ResumeResponse;
import com.resumeforge.entity.Resume;
import com.resumeforge.entity.User;
import com.resumeforge.mapper.ResumeMapper;
import com.resumeforge.repository.ResumeRepository;
import com.resumeforge.security.JwtTokenProvider;
import com.resumeforge.security.UserPrincipal;
import com.resumeforge.service.ActivityLogService;
import com.resumeforge.service.ResumeService;
import com.resumeforge.service.docx.DOCXGenerationService;
import com.resumeforge.service.parser.ResumeParserService;
import com.resumeforge.service.pdf.PDFGenerationService;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/resumes")
public class ResumeFileController {

    private final ResumeService resumeService;
    private final ResumeRepository resumeRepository;
    private final ResumeMapper resumeMapper;
    private final PDFGenerationService pdfGenerationService;
    private final DOCXGenerationService docxGenerationService;
    private final ResumeParserService resumeParserService;
    private final ActivityLogService activityLogService;
    private final JwtTokenProvider tokenProvider;

    public ResumeFileController(ResumeService resumeService,
                                ResumeRepository resumeRepository,
                                ResumeMapper resumeMapper,
                                PDFGenerationService pdfGenerationService,
                                DOCXGenerationService docxGenerationService,
                                ResumeParserService resumeParserService,
                                ActivityLogService activityLogService,
                                JwtTokenProvider tokenProvider) {
        this.resumeService = resumeService;
        this.resumeRepository = resumeRepository;
        this.resumeMapper = resumeMapper;
        this.pdfGenerationService = pdfGenerationService;
        this.docxGenerationService = docxGenerationService;
        this.resumeParserService = resumeParserService;
        this.activityLogService = activityLogService;
        this.tokenProvider = tokenProvider;
    }

    @GetMapping("/{id}/pdf")
    public ResponseEntity<byte[]> downloadPdf(@PathVariable Long id,
                                             @RequestParam(required = false) String token,
                                             @AuthenticationPrincipal UserPrincipal principal) {
        Long userId = null;
        if (principal != null) {
            userId = principal.getId();
        } else if (token != null && tokenProvider.validateToken(token)) {
            userId = tokenProvider.getUserIdFromJWT(token);
        }

        Resume resume;
        if (userId != null) {
            resume = resumeService.getResumeAndVerifyOwnership(id, userId);
        } else {
            resume = resumeRepository.findById(id)
                    .orElseThrow(() -> new RuntimeException("Resume not found"));
        }

        ResumeResponse resp = resumeMapper.toResponse(resume);
        byte[] pdfBytes = pdfGenerationService.generateResumePdf(resp);

        String fileName = (resume.getTitle() != null ? resume.getTitle().replaceAll("[^a-zA-Z0-9.-]", "_") : "resume") + ".pdf";

        if (resume.getUser() != null) {
            activityLogService.logActivity(resume.getUser(), "PDF_DOWNLOADED", "Downloaded PDF: " + resume.getTitle(), "RESUME", resume.getId());
        }

        return ResponseEntity.ok()
                .contentType(MediaType.APPLICATION_PDF)
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + fileName + "\"")
                .body(pdfBytes);
    }

    @GetMapping("/{id}/docx")
    public ResponseEntity<byte[]> downloadDocx(@PathVariable Long id,
                                               @RequestParam(required = false) String token,
                                               @AuthenticationPrincipal UserPrincipal principal) {
        Long userId = null;
        if (principal != null) {
            userId = principal.getId();
        } else if (token != null && tokenProvider.validateToken(token)) {
            userId = tokenProvider.getUserIdFromJWT(token);
        }

        Resume resume;
        if (userId != null) {
            resume = resumeService.getResumeAndVerifyOwnership(id, userId);
        } else {
            resume = resumeRepository.findById(id)
                    .orElseThrow(() -> new RuntimeException("Resume not found"));
        }

        ResumeResponse resp = resumeMapper.toResponse(resume);
        byte[] docxBytes = docxGenerationService.generateResumeDocx(resp);

        String fileName = (resume.getTitle() != null ? resume.getTitle().replaceAll("[^a-zA-Z0-9.-]", "_") : "resume") + ".docx";

        if (resume.getUser() != null) {
            activityLogService.logActivity(resume.getUser(), "DOCX_DOWNLOADED", "Downloaded Word DOCX: " + resume.getTitle(), "RESUME", resume.getId());
        }

        return ResponseEntity.ok()
                .contentType(MediaType.parseMediaType("application/vnd.openxmlformats-officedocument.wordprocessingml.document"))
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + fileName + "\"")
                .body(docxBytes);
    }

    @PostMapping("/upload-parse")
    public ResponseEntity<ApiResponse<Map<String, String>>> uploadAndParseResume(@RequestParam("file") MultipartFile file) {
        String extractedText = resumeParserService.extractTextFromFile(file);

        Map<String, String> data = new HashMap<>();
        data.put("fileName", file.getOriginalFilename());
        data.put("extractedText", extractedText);
        data.put("charCount", String.valueOf(extractedText.length()));

        return ResponseEntity.ok(ApiResponse.success("Resume parsed successfully", data));
    }
}
