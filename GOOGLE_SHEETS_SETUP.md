# Google Sheets Integration Setup Guide

## Overview
This guide helps you set up secure Google Sheets integration for SOULFUEL customer data storage and export functionality.

## 🔐 Security Features
- **GDPR/CCPA Compliant**: Automatic data export for compliance requests
- **Customer Service**: Easy data access for support teams
- **Secure Storage**: All data encrypted and access-controlled
- **Audit Trail**: Complete logging of all data exports and access
- **Time-Limited Access**: Export links expire after 30 days

## 📋 Setup Steps

### Step 1: Create Google Cloud Project
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project named "SOULFUEL-DataExport"
3. Enable the following APIs:
   - Google Sheets API
   - Google Drive API (optional, for advanced permissions)

### Step 2: Create Service Account
1. Navigate to **IAM & Admin > Service Accounts**
2. Click **Create Service Account**
3. Name: `soulfuel-data-export`
4. Description: `Service account for SOULFUEL customer data exports`
5. Click **Create and Continue**
6. Grant the **Editor** role
7. Click **Done**

### Step 3: Generate Service Account Key
1. Click on the created service account
2. Go to **Keys** tab
3. Click **Add Key > Create new key**
4. Choose **JSON** format
5. Download the key file (keep it secure!)

### Step 4: Set Environment Variables
Add these to your Replit Secrets or `.env` file:

```bash
# Google Sheets Service Account Configuration
GOOGLE_PROJECT_ID=your-project-id
GOOGLE_PRIVATE_KEY_ID=key-id-from-json
GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"
GOOGLE_CLIENT_EMAIL=service-account-email@project.iam.gserviceaccount.com
GOOGLE_CLIENT_ID=client-id-from-json

# Optional: Master spreadsheet for logging (create manually)
GOOGLE_SHEETS_ID=your-master-spreadsheet-id
```

### Step 5: Create Master Logging Spreadsheet (Optional)
1. Create a new Google Sheet manually
2. Name it "SOULFUEL-SystemLogs"
3. Create these sheets:
   - `UserInteractions`
   - `SystemLogs` 
   - `DataExports`
4. Share with your service account email (Editor access)
5. Copy the spreadsheet ID to `GOOGLE_SHEETS_ID`

## 🛡️ Security Best Practices

### Data Protection
- Service account keys are never exposed to client-side code
- All exports create new, isolated spreadsheets
- User data is never mixed between customers
- Export links auto-expire after 30 days

### Access Control
- Service account has minimal required permissions
- Each export creates a unique, unguessable spreadsheet
- No public sharing - only the user gets the link
- Audit logs track all access and exports

### Compliance Features
- **GDPR Article 20**: Right to data portability
- **CCPA Section 1798.110**: Right to know
- Complete export includes all stored personal data
- Clear data categories and retention policies

## 📊 Export Structure

Each user export creates a Google Sheet with these tabs:

### 1. User_Profile
- Account information
- Subscription details
- Service usage statistics

### 2. Sugar_Tracking
- Daily sugar intake logs
- Meal categorization
- User notes and timestamps

### 3. Mood_Tracking  
- Emotional state entries
- Energy level tracking
- Mood pattern analysis

### 4. Craving_Tracking
- Craving intensity logs
- Trigger identification
- Coping strategies used

### 5. AI_Conversations
- Chat message history
- AI coaching responses
- Session categorization

### 6. Food_Analysis
- Food scan results
- Nutritional analysis
- Health recommendations

### 7. Export_Summary
- Export metadata
- Data verification
- Compliance information

## 🔧 API Endpoints

### User Data Export
```bash
POST /api/export-user-data
# Exports all user data to new Google Sheet
# Returns download link valid for 30 days
```

### Customer Service Export
```bash
POST /api/admin/export-customer-data
# Admin-only endpoint for support teams
# Creates filtered export with last 90 days
```

### Data Summary
```bash
GET /api/user-data-summary
# Quick overview of user's data
# Shows counts by category
```

## 📞 Customer Service Usage

### For Support Requests
1. Use the admin export endpoint with customer's user ID
2. Specify the support agent requesting access
3. Receive secure Google Sheet link
4. Access customer's recent activity (90 days)
5. Export automatically logged for audit trail

### Response Time
- Data exports typically complete in 30-60 seconds
- Large datasets (1000+ entries) may take up to 2 minutes
- Users receive immediate confirmation with tracking ID

## 🚨 Emergency Procedures

### If Service Account is Compromised
1. Immediately revoke the service account key in Google Cloud Console
2. Generate new service account credentials
3. Update environment variables
4. Monitor for unauthorized exports in system logs

### If User Reports Data Issue
1. Use customer service export to verify their data
2. Compare with database records
3. Generate fresh export if needed
4. Provide secure link directly to customer

## ✅ Testing the Integration

### Test User Export
```bash
curl -X POST "https://your-domain.com/api/export-user-data" \
  -H "Authorization: Bearer user-token" \
  -H "Content-Type: application/json"
```

### Test Admin Export  
```bash
curl -X POST "https://your-domain.com/api/admin/export-customer-data" \
  -H "Content-Type: application/json" \
  -d '{"userId": 123, "requestedBy": "support@soulfuel.com"}'
```

## 💡 Pro Tips

### Performance Optimization
- Exports run asynchronously to avoid timeouts
- Large datasets are paginated automatically
- Service caches export links for 24 hours

### Cost Management
- Each export creates ~1MB Google Sheet
- 1000 exports/month ≈ $0.50 in Google API costs
- Service account has no per-user limits

### Monitoring
- All exports logged with timestamps
- Failed exports trigger automatic alerts
- Weekly audit reports available

## 🔍 Troubleshooting

### Common Issues
1. **"Authentication failed"** - Check service account credentials
2. **"Spreadsheet creation failed"** - Verify Google Sheets API is enabled
3. **"Export timeout"** - Large datasets may need chunking
4. **"Permission denied"** - Ensure service account has Editor role

### Debug Mode
Set `NODE_ENV=development` for detailed logging of:
- API requests to Google Sheets
- Authentication token refresh
- Export progress and errors
- Data transformation steps

Need help? Contact the development team with your specific error messages and user ID.