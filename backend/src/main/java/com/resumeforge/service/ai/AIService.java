package com.resumeforge.service.ai;

import com.resumeforge.dto.request.AIImproveRequest;
import com.resumeforge.dto.request.JobAnalyzeRequest;
import com.resumeforge.dto.request.ResumeRequest;
import com.resumeforge.dto.response.AIImproveResponse;
import com.resumeforge.dto.response.JobAnalysisResponse;
import com.resumeforge.dto.response.ResumeResponse;

public interface AIService {

    JobAnalysisResponse analyzeJobDescription(JobAnalyzeRequest request);

    ResumeResponse generateTailoredResume(ResumeResponse baseResume, String jobTitle, String companyName, String jobDescription);

    AIImproveResponse improveContent(AIImproveRequest request);
}
