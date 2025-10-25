# 🚀 Deployment Guide

## Frontend Deployment (Vercel/Netlify)

### Vercel (Recommended)
1. **Connect GitHub repository**
2. **Set build settings:**
   - Build Command: `cd frontend && npm run build`
   - Output Directory: `frontend/dist`
   - Install Command: `npm run install-all`

3. **Environment Variables:**
   ```
   VITE_API_URL=https://your-backend-url.com/api
   ```

### Netlify
1. **Build settings:**
   - Build command: `cd frontend && npm run build`
   - Publish directory: `frontend/dist`

2. **Redirects** (create `frontend/public/_redirects`):
   ```
   /*    /index.html   200
   ```

## Backend Deployment (Heroku/Railway)

### Heroku
1. **Create Heroku app**
2. **Set environment variables:**
   ```bash
   heroku config:set NODE_ENV=production
   heroku config:set PORT=5000
   ```

3. **Deploy:**
   ```bash
   git subtree push --prefix server heroku main
   ```

### Railway
1. **Connect repository**
2. **Set root directory:** `server`
3. **Environment variables:**
   ```
   NODE_ENV=production
   PORT=5000
   ```

## Environment Configuration

### Frontend (.env)
```env
VITE_API_URL=https://your-backend-url.com/api
VITE_FIREBASE_API_KEY=your-api-key
VITE_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your-project-id
VITE_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=123456789
VITE_FIREBASE_APP_ID=your-app-id
```

### Backend (.env)
```env
NODE_ENV=production
PORT=5000
FIREBASE_PROJECT_ID=your-project-id
FIREBASE_PRIVATE_KEY_ID=your-private-key-id
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nyour-private-key\n-----END PRIVATE KEY-----\n"
FIREBASE_CLIENT_EMAIL=your-service-account@your-project.iam.gserviceaccount.com
FIREBASE_CLIENT_ID=your-client-id
```

## Database Setup (Firebase Firestore)

1. **Enable Firestore** in Firebase Console
2. **Set up security rules:**
   ```javascript
   rules_version = '2';
   service cloud.firestore {
     match /databases/{database}/documents {
       match /users/{userId} {
         allow read, write: if request.auth != null && request.auth.uid == userId;
       }
       match /groups/{groupId} {
         allow read, write: if request.auth != null;
       }
     }
   }
   ```

## Production Checklist

- [ ] Set up Firebase project
- [ ] Configure authentication
- [ ] Set up Firestore database
- [ ] Deploy backend API
- [ ] Deploy frontend
- [ ] Update API URLs
- [ ] Test authentication flow
- [ ] Test matching algorithm
- [ ] Test group creation
- [ ] Set up monitoring
- [ ] Configure domain (optional)

## Monitoring & Analytics

### Recommended Tools:
- **Firebase Analytics** - User behavior
- **Firebase Crashlytics** - Error tracking
- **Vercel Analytics** - Performance monitoring
- **Heroku Metrics** - Backend monitoring

## Security Considerations

1. **API Rate Limiting** - Implement rate limiting
2. **CORS Configuration** - Restrict origins
3. **Input Validation** - Validate all inputs
4. **Authentication** - Secure Firebase rules
5. **HTTPS Only** - Force HTTPS in production

## Performance Optimization

### Frontend:
- Code splitting with React.lazy()
- Image optimization
- Bundle size analysis
- Service worker for caching

### Backend:
- Database indexing
- API response caching
- Connection pooling
- Error monitoring

## Scaling Considerations

- **Database**: Consider PostgreSQL for complex queries
- **Caching**: Redis for session storage
- **CDN**: CloudFlare for static assets
- **Load Balancing**: Multiple server instances
- **Monitoring**: Application performance monitoring

## Backup Strategy

- **Database**: Firebase automatic backups
- **Code**: Git repository backups
- **Environment**: Document all configurations
- **Secrets**: Secure secret management

---

**Ready for production deployment!** 🚀
