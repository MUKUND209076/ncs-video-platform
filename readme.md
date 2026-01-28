# API-First Video App

## Architecture
React Native → API → DB → YouTube(hidden)

## Features
- JWT Authentication
- Secure token-based video playback
- API-first design
- Thin client mobile app
- Backend-controlled streaming
- Secure abstraction layer

## Setup

### Backend
cd backend
npm install
node src/server.js

### Mobile
cd mobile-app
npm install
npx expo start

## API Flow
/dashboard → videos + playback_token  
/video/:id/stream?token=... → stream_url

## Security
- JWT auth
- Playback tokens
- Token expiry
- Backend validation
- No YouTube in frontend
