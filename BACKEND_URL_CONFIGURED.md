# Backend URL Configuration Complete

## ✅ Changes Made

All backend API calls have been configured to use:
**`https://ankitp19-open.hf.space`**

### Updated Files

1. **`Web/lib/api-config.ts`**
   - Default backend URL set to `https://ankitp19-open.hf.space`
   - Uses `process.env.NEXT_PUBLIC_API_BASE` environment variable
   - Uses HTTPS (no port)
   - Falls back to production URL if environment variable is not set

2. **`Web/vercel.json`**
   - Updated rewrite destination to use the new backend URL
   - Updated for Vercel deployment

3. **`vercel.json`** (root)
   - Updated rewrite destination
   - Set `NEXT_PUBLIC_API_BASE` environment variable

## 🔧 How It Works

### API Configuration

The `getBackendUrl()` function in `Web/lib/api-config.ts`:
- **Environment Variable**: Uses `process.env.NEXT_PUBLIC_API_BASE`
- **Production**: Defaults to `https://ankitp19-open.hf.space` if env var not set
- **HTTPS Only**: All requests use HTTPS protocol
- **No Port**: No port number in the URL

### All API Endpoints

All components use `API_ENDPOINTS` which automatically uses the configured backend URL:

- ✅ Financial insights: `/api/generate-insight`
- ✅ What-if analysis: `/api/what-if-analysis`
- ✅ Marketing insights: `/api/generate-marketing-insight`
- ✅ Campaign suggestions: `/api/generate-campaign-suggestions`
- ✅ Marketing video: `/api/generate-marketing-video`
- ✅ Video download: `/api/download-video/{video_name}`
- ✅ Operations insights: `/api/generate-operations-insight`
- ✅ Handle alerts: `/api/handle-alert`
- ✅ Bank loan rates: `/api/get-bank-loan-rates`
- ✅ Health check: `/health`

## 🌐 Environment Variables

### Environment Variable Name

**`NEXT_PUBLIC_API_BASE`** - Base URL for all backend API calls

### For Local Development (Optional)

If you want to use a different backend for local development, set:

```env
NEXT_PUBLIC_API_BASE=http://localhost:8000
```

### For Production

The default is already set to `https://ankitp19-open.hf.space`, so no environment variable is needed unless you want to override it.

### Vercel Deployment

If deploying to Vercel, you can optionally set:
- `NEXT_PUBLIC_API_BASE` = `https://ankitp19-open.hf.space` (or leave unset to use default)

## ✅ Verification

All backend API calls will now go to:
- Base URL: `https://ankitp19-open.hf.space`
- Example: `https://ankitp19-open.hf.space/api/generate-insight`
- Example: `https://ankitp19-open.hf.space/health`

## 📝 Notes

- ✅ All requests use HTTPS
- ✅ No port numbers in URLs
- ✅ Centralized configuration in `api-config.ts`
- ✅ All components automatically use the new URL
- ✅ Can be overridden with environment variables if needed

## 🚀 Ready to Deploy

Your application is now configured to use the Hugging Face Spaces backend. All API calls will automatically use `https://ankitp19-open.hf.space` as the base URL.
