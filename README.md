# 🚀 Accelerate: Your Campus, Your Events

Accelerate is a personalized campus event discovery app built for students who want to stay in the loop — without digging through flyers, emails, or social media.

> _Discover. RSVP. Show up. Repeat._

---

## 📱 Features (Phase 2 Complete)

- 🔐 **Firebase Authentication**
  - Secure login & signup with persistent sessions

- 🎯 **Smart Interest Onboarding**
  - Choose what you care about (Tech, Art, Music, etc.)
  - Personalized event feed based on selected interests

- 📆 **Curated Event Feed**
  - View upcoming campus events tailored to you
  - Filtered by your saved interests

- ✅ **RSVP / Save Events**
  - One-tap save to "My Events"
  - Stored in your user profile in Firestore

- 📁 **My Events Dashboard**
  - View your saved events in one place
  - Great for planning and reminders

- 📝 **Club Event Submission**
  - Allow clubs to post their own events
  - Events include tags, descriptions, date, and location

---

## 🛠 Tech Stack

| Layer            | Tech Used                      |
|------------------|--------------------------------|
| Framework        | React Native (Expo)            |
| State Mgmt       | React Hooks                    |
| Backend          | Firebase Firestore             |
| Auth             | Firebase Authentication        |
| Persistence      | AsyncStorage                   |
| Navigation       | React Navigation               |
| Platform         | Android + iOS + Web (via Expo) |

---

## 🔧 Setup Instructions

```bash
# Clone the repo
git clone https://github.com/arnavchawla26/accelerate.git
cd accelerate

# Install dependencies
npm install

# Start the development server
npx expo start
