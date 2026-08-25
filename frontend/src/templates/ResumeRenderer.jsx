import React from 'react';
import { ATSClassicTemplate } from './ATSClassicTemplate';
import { ModernProTemplate } from './ModernProTemplate';
import { SoftwareEngineerTemplate } from './SoftwareEngineerTemplate';
import { CloudDevOpsTemplate } from './CloudDevOpsTemplate';
import { MinimalTemplate } from './MinimalTemplate';
import { FresherTemplate } from './FresherTemplate';

export const ResumeRenderer = ({ resume }) => {
  if (!resume) {
    return (
      <div className="bg-white p-8 text-center text-slate-400 text-sm">
        No resume data available for preview.
      </div>
    );
  }

  const template = resume.template || 'ATS_CLASSIC';

  switch (template) {
    case 'MODERN_PRO':
      return <ModernProTemplate resume={resume} />;
    case 'SOFTWARE_ENGINEER':
      return <SoftwareEngineerTemplate resume={resume} />;
    case 'CLOUD_DEVOPS':
      return <CloudDevOpsTemplate resume={resume} />;
    case 'MINIMAL':
      return <MinimalTemplate resume={resume} />;
    case 'FRESHER':
      return <FresherTemplate resume={resume} />;
    case 'ATS_CLASSIC':
    default:
      return <ATSClassicTemplate resume={resume} />;
  }
};
