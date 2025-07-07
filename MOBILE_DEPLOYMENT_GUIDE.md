# SOULFUEL Mobile App Deployment Guide

## Prerequisites for App Store Deployment

### Apple App Store Requirements:
1. **Apple Developer Account** ($99/year)
   - Sign up at: https://developer.apple.com/programs/
   - Complete enrollment process (can take 24-48 hours)

2. **Development Environment**:
   - macOS computer (required for iOS builds)
   - Xcode 15+ installed
   - iOS Simulator for testing

3. **App Store Connect Setup**:
   - Create app listing at: https://appstoreconnect.apple.com/
   - Configure app metadata, screenshots, descriptions

### Google Play Store Requirements:
1. **Google Play Console Account** ($25 one-time fee)
   - Sign up at: https://play.google.com/console/
   - Complete developer registration

2. **Development Environment**:
   - Android Studio installed
   - Android SDK configured
   - Android emulator for testing

## Step-by-Step Deployment Process

### Phase 1: Configure React Native Build

#### 1. Update App Configuration
```bash
# Navigate to mobile directory
cd mobile

# Update app.json with production configuration
```

#### 2. Configure App Icons and Splash Screens
- Create app icons for all required sizes
- Generate splash screens for both platforms
- Use tools like: https://appicon.co/ or https://apetools.webprofusion.com/

#### 3. Update App Metadata
- App name: "SoulFuel - Mindful Wellness"
- Bundle ID: com.soulfuel.wellness
- Version: 1.0.0

### Phase 2: iOS Deployment (Apple App Store)

#### 1. Configure iOS Build
```bash
# Install iOS dependencies
cd ios && pod install && cd ..

# Create production build
npx react-native run-ios --configuration Release
```

#### 2. Create App Store Listing
- Screenshots (required sizes: 6.7", 6.5", 5.5", 12.9")
- App description (4000 character limit)
- Keywords for SEO
- Age rating (likely 4+ or 9+)
- Privacy policy URL

#### 3. Submit for Review
- Upload build through Xcode or Transporter
- Fill out App Store Review Information
- Submit for Apple review (typically 1-7 days)

### Phase 3: Android Deployment (Google Play Store)

#### 1. Configure Android Build
```bash
# Generate signed APK/AAB
cd android
./gradlew bundleRelease

# Or create APK
./gradlew assembleRelease
```

#### 2. Create Play Store Listing
- Screenshots for tablets and phones
- Feature graphic (1024 x 500)
- App description (4000 character limit)
- Content rating questionnaire

#### 3. Submit for Review
- Upload signed AAB (recommended) or APK
- Complete store listing
- Submit for Google review (typically 1-3 days)

### Phase 4: Required Legal Documents

#### Privacy Policy (Required)
- GDPR compliance for EU users
- CCPA compliance for California users
- Data collection and usage policies
- Third-party service disclosures (Firebase, Gemini AI, Stripe)

#### Terms of Service
- User agreements
- Subscription terms
- Account termination policies
- Limitation of liability

### Phase 5: Marketing Assets

#### App Store Screenshots (iOS)
Required sizes:
- iPhone 15 Pro Max: 1320 x 2868 px
- iPhone 15 Pro: 1179 x 2556 px
- iPad Pro 12.9": 2048 x 2732 px

#### Google Play Screenshots (Android)
Required sizes:
- Phone: 1080 x 1920 px (minimum)
- Tablet: 1200 x 1920 px (minimum)
- Feature graphic: 1024 x 500 px

### Phase 6: App Store Optimization (ASO)

#### Keywords Research
- "sugar addiction recovery"
- "mindful eating tracker"
- "wellness companion"
- "craving management"
- "emotional eating support"

#### App Description Template
```
Transform Your Relationship with Food 🌟

SoulFuel is your AI-powered wellness companion that helps you overcome sugar addiction, track emotional eating, and build lasting healthy habits.

🔮 PREDICTIVE WELLNESS
• CraveClock™ predicts cravings with 73% accuracy
• Smart health insights from wearable data
• Proactive intervention before setbacks occur

🎤 VOICE AI COMPANION
• Speak to your personalized AI coach
• 5 unique companion personalities
• Real-time emotional support

🚨 CRISIS SUPPORT SYSTEM
• 3-tier emergency response
• Mini-games for distraction
• Friend alert system

📊 COMPREHENSIVE TRACKING
• 4-mode food scanner (camera/text/barcode/upload)
• Sugar, mood, and craving tracking
• Advanced analytics and insights

🎮 GAMIFICATION
• XP points and achievement badges
• Daily streaks and challenges
• Interactive mini-games

💎 PREMIUM FEATURES
• Unlimited AI coaching sessions
• Advanced food analysis
• Wearable device integration
• Expert consultations

Download SoulFuel today and start your journey to food freedom!

Privacy Policy: [URL]
Terms of Service: [URL]
```

## Required Certificates and Keys

### iOS Certificates (Apple Developer Account)
1. **Development Certificate**: For testing on devices
2. **Distribution Certificate**: For App Store submission
3. **Provisioning Profiles**: Device-specific permissions
4. **App Store Connect API Key**: For automated uploads

### Android Certificates
1. **Keystore File**: For signing APK/AAB files
2. **Google Play App Signing**: Recommended for security
3. **Firebase Configuration**: google-services.json

## Testing Checklist Before Submission

### Functionality Testing
- [ ] All 54 features work correctly
- [ ] Authentication flow (Firebase)
- [ ] Payment processing (Stripe)
- [ ] Camera permissions
- [ ] Microphone permissions (Voice Soul Talk)
- [ ] Offline functionality
- [ ] Push notifications

### Performance Testing
- [ ] App launches in <3 seconds
- [ ] Smooth navigation between screens
- [ ] Memory usage optimization
- [ ] Battery usage optimization

### Security Testing
- [ ] Data encryption implementation
- [ ] Secure API calls
- [ ] User data protection
- [ ] Payment security compliance

## Review Guidelines Compliance

### Apple App Store Review Guidelines
- No misleading health claims
- Proper in-app purchase implementation
- Accessibility compliance (VoiceOver support)
- Privacy policy prominently displayed

### Google Play Store Policies
- Target API level requirements
- 64-bit architecture support
- Restricted permissions usage justified
- Content rating accuracy

## Post-Launch Strategy

### Version Updates
- Regular feature updates
- Bug fixes and performance improvements
- New wellness content and recipes
- Seasonal challenges and events

### User Acquisition
- App Store Optimization (ASO)
- Social media marketing
- Health blogger partnerships
- Influencer collaborations

### Analytics and Monitoring
- App performance monitoring
- User behavior analytics
- Crash reporting
- Revenue tracking

## Estimated Timeline

| Phase | Duration | Tasks |
|-------|----------|-------|
| **Preparation** | 1-2 weeks | App icons, screenshots, legal documents |
| **iOS Submission** | 3-7 days | Build upload, review process |
| **Android Submission** | 1-3 days | AAB upload, review process |
| **Total Time** | 2-3 weeks | From start to live apps |

## Next Immediate Steps

1. **Create Apple Developer Account** (if not done)
2. **Create Google Play Console Account** (if not done)
3. **Generate app icons and screenshots**
4. **Write privacy policy and terms of service**
5. **Configure production Firebase project**
6. **Set up Stripe production environment**
7. **Create signed production builds**

Would you like me to help you with any specific step in this deployment process?