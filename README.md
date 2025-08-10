# 🎵 MoodTunes

**A Spotify-powered music recommendation app that curates playlists based on your mood**

![MoodTunes Demo](https://img.shields.io/badge/Status-Live-brightgreen) ![React](https://img.shields.io/badge/React-18.0+-blue) ![Tailwind](https://img.shields.io/badge/Tailwind-CSS-38B2AC) ![Spotify](https://img.shields.io/badge/Spotify-API-1DB954)

## ✨ Features

- **🎭 Mood-Based Recommendations**: Choose from 8 different moods (Happy, Sad, Energetic, Chill, Focus, Party, Romantic, Workout)
- **🎵 Spotify Integration**: Seamless OAuth authentication and playlist creation
- **🤖 Smart Algorithm**: Uses Spotify's audio features (valence, energy, danceability) to match your mood
- **💾 Save Playlists**: Create and save personalized playlists directly to your Spotify account
- **🎧 Audio Previews**: Listen to track previews before saving
- **📱 Responsive Design**: Beautiful, modern UI that works on all devices


## 🛠️ Tech Stack

- **Frontend**: React 18 + Vite
- **Styling**: Tailwind CSS
- **API**: Spotify Web API
- **Authentication**: Spotify OAuth 2.0
- **Deployment**: Netlify/Vercel ready

## 📋 Prerequisites

Before running this project, you'll need:

1. **Node.js** (v16 or higher)
2. **Spotify Developer Account** - [Sign up here](https://developer.spotify.com/dashboard)
3. **Spotify App Credentials** (Client ID)

## ⚙️ Setup Instructions

### 1. Clone the Repository
```bash
git clone https://github.com/dannygzrcia/MoodFinder.git
cd MoodFinder
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Configure Spotify API

1. Go to [Spotify Developer Dashboard](https://developer.spotify.com/dashboard)
2. Create a new app
3. Add `http://localhost:5173` to Redirect URIs
4. Copy your Client ID
5. Replace `'your_spotify_client_id_here'` in `src/components/SpotifyAuth.jsx` with your actual Client ID

### 4. Run the Development Server
```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) to view the app!

## 🎯 How It Works

1. **Connect to Spotify**: Authenticate with your Spotify account
2. **Select Your Mood**: Choose from 8 carefully crafted mood options
3. **Get Recommendations**: The app analyzes your listening history and uses Spotify's recommendation engine
4. **Enjoy & Save**: Listen to previews and save your favorite playlists

## 🎨 Mood Profiles

Each mood uses specific audio feature targets:

- **😊 Happy**: High valence (0.8), moderate energy (0.7)
- **😢 Sad**: Low valence (0.2), low energy (0.3)
- **⚡ Energetic**: High energy (0.9), high danceability (0.8)
- **🌊 Chill**: Moderate valence (0.6), low energy (0.4)
- **🎯 Focus**: Balanced features, high instrumentalness (0.7)
- **🎉 Party**: High valence (0.8), maximum energy (0.9)
- **💕 Romantic**: High valence (0.7), moderate acousticness (0.6)
- **💪 Workout**: High energy (0.95), high danceability (0.8)

## 📁 Project Structure

```
src/
├── components/
│   ├── SpotifyAuth.jsx      # Spotify OAuth authentication
│   ├── MoodSelector.jsx     # Mood selection interface
│   └── PlaylistDisplay.jsx  # Playlist display and creation
├── App.jsx                  # Main application component
├── index.css               # Tailwind CSS imports
└── main.jsx                # Application entry point
```

## 🚀 Deployment

### Deploy to Netlify
1. Build the project: `npm run build`
2. Deploy the `dist` folder to Netlify
3. Update Spotify app settings with your production URL

### Deploy to Vercel
1. Connect your GitHub repository to Vercel
2. Vercel will automatically detect it's a Vite project
3. Update Spotify redirect URIs with your Vercel URL

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License.

## 🙏 Acknowledgments

- [Spotify Web API](https://developer.spotify.com/documentation/web-api/) for music data
- [Tailwind CSS](https://tailwindcss.com/) for styling
- [React](https://reactjs.org/) for the frontend framework

---

**Built with ❤️ for music lovers everywhere**
