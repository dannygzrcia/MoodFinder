import { useState } from 'react'
import MoodSelector from './components/MoodSelector'
import SpotifyAuth from './components/SpotifyAuth'
import PlaylistDisplay from './components/PlaylistDisplay'
import './App.css'

function App() {
  const [selectedMood, setSelectedMood] = useState(null)
  const [accessToken, setAccessToken] = useState(null)
  const [playlist, setPlaylist] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-violet-900">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-6xl font-bold text-white mb-4">
            🎵 <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-500">MoodTunes</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Discover music that matches your mood using Spotify's powerful recommendation engine
          </p>
        </div>

        {/* Main Content */}
        <div className="max-w-4xl mx-auto">
          {!accessToken ? (
            <SpotifyAuth onAuth={setAccessToken} />
          ) : (
            <div className="space-y-8">
              <MoodSelector 
                selectedMood={selectedMood} 
                onMoodSelect={setSelectedMood}
                accessToken={accessToken}
                onPlaylistGenerated={setPlaylist}
                isLoading={isLoading}
                setIsLoading={setIsLoading}
              />
              
              {playlist.length > 0 && (
                <PlaylistDisplay 
                  playlist={playlist} 
                  mood={selectedMood}
                  accessToken={accessToken}
                />
              )}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="text-center mt-16 text-gray-400">
          <p>Powered by Spotify Web API • Built with React & Tailwind CSS</p>
        </div>
      </div>
    </div>
  )
}

export default App
