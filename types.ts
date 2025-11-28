export enum EmailCategory {
  LEGITIMATE = 'Legitimate',
  SPAM = 'Spam',
  PHISHING = 'Phishing'
}

export interface EmailData {
  sender: string;
  replyTo: string;
  subject: string;
  body: string;
  hasAttachments: boolean;
  attachmentNames: string;
  links: string;
  timestamp: string;
}

export interface AnalysisResult {
  category: EmailCategory;
  confidenceScore: number;
  riskFactors: string[];
  featureAnalysis: {
    contentAnalysis: string;
    headerAnalysis: string;
    linkAnalysis: string;
  };
  summary: string;
}

export interface ModelMetric {
  name: string;
  accuracy: number;
  precision: number;
  recall: number;
  f1: number;
}
