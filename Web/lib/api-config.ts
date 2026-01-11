/**
 * API Configuration
 * Centralized configuration for API endpoints
 */

// Get backend URL from environment variable, fallback to localhost for development
export const getBackendUrl = (): string => {
  if (typeof window !== 'undefined') {
    // Client-side: use public env var
    return process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:8000';
  } else {
    // Server-side: prefer internal URL if available, otherwise public
    return process.env.BACKEND_URL || process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:8000';
  }
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
