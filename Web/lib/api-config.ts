/**
 * API Configuration
 * Centralized configuration for API endpoints
 */

// Get backend URL from environment variable, fallback to production URL
export const getBackendUrl = (): string => {
  // Production backend URL (Hugging Face Spaces)
  const productionUrl = 'https://ankitp19-open.hf.space';
  
  // Use NEXT_PUBLIC_API_BASE environment variable, fallback to production URL
  return process.env.NEXT_PUBLIC_API_BASE || productionUrl;
};

// API endpoint helpers
export const API_ENDPOINTS = {
  // Financial endpoints
  generateInsight: () => `${getBackendUrl()}/api/generate-insight`,
  whatIfAnalysis: () => `${getBackendUrl()}/api/what-if-analysis`,
  
  // Marketing endpoints
  generateMarketingInsight: () => `${getBackendUrl()}/api/generate-marketing-insight`,
  analyzeCampaignStrategy: () => `${getBackendUrl()}/api/analyze-campaign-strategy`,
  generateCampaignSuggestions: () => `${getBackendUrl()}/api/generate-campaign-suggestions`,
  generateMarketingVideo: () => `${getBackendUrl()}/api/generate-marketing-video`,
  downloadVideo: (videoName: string) => `${getBackendUrl()}/api/download-video/${videoName}`,
  
  // Operations endpoints
  generateOperationsInsight: () => `${getBackendUrl()}/api/generate-operations-insight`,
  handleAlert: () => `${getBackendUrl()}/api/handle-alert`,
  
  // Loan endpoints
  getBankLoanRates: () => `${getBackendUrl()}/api/get-bank-loan-rates`,
  
  // Health check
  health: () => `${getBackendUrl()}/health`,
};
