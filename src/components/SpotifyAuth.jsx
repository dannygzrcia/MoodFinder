import { useEffect } from 'react'

const SpotifyAuth = ({ onAuth }) => {
  const CLIENT_ID = 'your_spotify_client_id_here' // You'll need to replace this
  const REDIRECT_URI = 'http://localhost:5173'
  const SCOPES = [
    'user-read-private',
    'user-read-email',
    'playlist-modify-public',
    'playlist-modify-private',
    'user-top-read',
    'user-read-recently-played'
  ].join(' ')

  useEffect(() => {
    // Check if we have an access token in the URL hash
    const hash = window.location.hash
    if (hash) {
      const token = hash.substring(1).split('&').find(elem => elem.startsWith('access_token')).split('=')[1]
      if (token) {
        window.location.hash = ''
        onAuth(token)
      }
    }
  }, [onAuth])

  const handleLogin = () => {
    const authUrl = `https://accounts.spotify.com/authorize?client_id=${CLIENT_ID}&response_type=token&redirect_uri=${encodeURIComponent(REDIRECT_URI)}&scope=${encodeURIComponent(SCOPES)}`
    window.location.href = authUrl
  }

  return (
    <div className="text-center">
      <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 max-w-md mx-auto">
        <div className="mb-6">
          <div className="w-20 h-20 bg-spotify rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.84-.179-.84-.6 0-.359.24-.66.54-.78 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.242 1.021zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.42 1.56-.299.421-1.02.599-1.559.3z"/>
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-white mb-2">Connect to Spotify</h2>
          <p className="text-gray-300">
            Connect your Spotify account to get personalized music recommendations based on your mood
          </p>
        </div>

        <button
          onClick={handleLogin}
          className="w-full bg-spotify hover:bg-green-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2"
        >
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.84-.179-.84-.6 0-.359.24-.66.54-.78 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.242 1.021zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.42 1.56-.299.421-1.02.599-1.559.3z"/>
          </svg>
          Connect with Spotify
        </button>

        <div className="mt-6 p-4 bg-yellow-500/20 rounded-lg">
          <p className="text-sm text-yellow-200">
            <strong>Setup Required:</strong> You'll need to create a Spotify app and add your Client ID to make this work. 
            <a href="https://developer.spotify.com/dashboard" target="_blank" rel="noopener noreferrer" className="underline hover:text-yellow-100">
              Get started here →
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}

export default SpotifyAuth
