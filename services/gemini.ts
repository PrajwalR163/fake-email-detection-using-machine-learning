import { GoogleGenAI, Type } from "@google/genai";
import { AnalysisResult, EmailData, EmailCategory } from '../types';

export const analyzeEmail = async (email: EmailData): Promise<AnalysisResult> => {
  const apiKey = process.env.API_KEY;

  if (!apiKey) {
    // Fallback simulation if no API key is present for demo purposes (though in this env API_KEY should exist)
    console.warn("No API Key found, using mock simulation.");
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          category: EmailCategory.PHISHING,
          confidenceScore: 92,
          riskFactors: ["Urgency detected", "Mismatched Sender Domain", "Suspicious Link"],
          featureAnalysis: {
            contentAnalysis: "High urgency language used ('Immediate action required').",
            headerAnalysis: "Sender domain 'secure-bank-verify.com' does not match official bank domains.",
            linkAnalysis: "Link destination is obfuscated and uses HTTP instead of HTTPS."
          },
          summary: "This email exhibits classic phishing characteristics including social engineering tactics and spoofed headers."
        });
      }, 1500);
    });
  }

  const ai = new GoogleGenAI({ apiKey });

  const prompt = `
    Analyze the following email for security risks. 
    Classify it as Legitimate, Spam, or Phishing.
    
    Email Details:
    From: ${email.sender}
    Reply-To: ${email.replyTo}
    Subject: ${email.subject}
    Body: ${email.body}
    Has Attachments: ${email.hasAttachments}
    Attachment Names: ${email.attachmentNames}
    Links/URLs found in text: ${email.links}
    Timestamp: ${email.timestamp}

    Task:
    1. Check for keyword indicators (urgency, money, passwords).
    2. Check for header inconsistencies (From vs Reply-To).
    3. Analyze link entropy and suspicion.
    4. Provide a confidence score (0-100).
    5. List specific risk factors.
    6. Provide a detailed breakdown of features.
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            category: { type: Type.STRING, enum: ["Legitimate", "Spam", "Phishing"] },
            confidenceScore: { type: Type.NUMBER },
            riskFactors: { 
              type: Type.ARRAY, 
              items: { type: Type.STRING } 
            },
            featureAnalysis: {
              type: Type.OBJECT,
              properties: {
                contentAnalysis: { type: Type.STRING },
                headerAnalysis: { type: Type.STRING },
                linkAnalysis: { type: Type.STRING }
              }
            },
            summary: { type: Type.STRING }
          }
        }
      }
    });

    const text = response.text;
    if (!text) throw new Error("No response from AI");

    const result = JSON.parse(text);
    
    // Map string to Enum
    let category = EmailCategory.LEGITIMATE;
    if (result.category === "Spam") category = EmailCategory.SPAM;
    if (result.category === "Phishing") category = EmailCategory.PHISHING;

    return {
      ...result,
      category
    };

  } catch (error) {
    console.error("Gemini Analysis Error:", error);
    throw new Error("Failed to analyze email. Please try again.");
  }
};
