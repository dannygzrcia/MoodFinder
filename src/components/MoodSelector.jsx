import { useState } from 'react'

const MoodSelector = ({ selectedMood, onMoodSelect, accessToken, onPlaylistGenerated, isLoading, setIsLoading }) => {
  const moods = [
    { 
      id: 'happy', 
      name: 'Happy', 
      emoji: '😊', 
      color: 'from-yellow-400 to-orange-500',
      audioFeatures: { valence: 0.8, energy: 0.7, danceability: 0.7 }
    },
    { 
      id: 'sad', 
      name: 'Sad', 
      emoji: '😢', 
      color: 'from-blue-400 to-blue-600',
      audioFeatures: { valence: 0.2, energy: 0.3, danceability: 0.3 }
    },
    { 
      id: 'energetic', 
      name: 'Energetic', 
      emoji: '⚡', 
      color: 'from-red-400 to-pink-500',
      audioFeatures: { valence: 0.7, energy: 0.9, danceability: 0.8 }
    },
    { 
      id: 'chill', 
      name: 'Chill', 
      emoji: '🌊', 
      color: 'from-green-400 to-teal-500',
      audioFeatures: { valence: 0.6, energy: 0.4, danceability: 0.5 }
    },
    { 
      id: 'focus', 
      name: 'Focus', 
      emoji: '🎯', 
      color: 'from-purple-400 to-indigo-500',
      audioFeatures: { valence: 0.5, energy: 0.5, instrumentalness: 0.7 }
    },
    { 
      id: 'party', 
      name: 'Party', 
      emoji: '🎉', 
      color: 'from-pink-400 to-purple-500',
      audioFeatures: { valence: 0.8, energy: 0.9, danceability: 0.9 }
    },
    { 
      id: 'romantic', 
      name: 'Romantic', 
      emoji: '💕', 
      color: 'from-rose-400 to-pink-500',
      audioFeatures: { valence: 0.7, energy: 0.4, acousticness: 0.6 }
    },
    { 
      id: 'workout', 
      name: 'Workout', 
      emoji: '💪', 
      color: 'from-orange-400 to-red-500',
      audioFeatures: { valence: 0.7, energy: 0.95, danceability: 0.8 }
    }
  ]

  const generatePlaylist = async (mood) => {
    setIsLoading(true)
    try {
      // Get user's top tracks for seed tracks
      const topTracksResponse = await fetch('https://api.spotify.com/v1/me/top/tracks?limit=5', {
        headers: {
          'Authorization': `Bearer ${accessToken}`
        }
      })
      const topTracks = await topTracksResponse.json()
      
      // Get seed tracks (use top tracks or fallback to popular tracks)
      const seedTracks = topTracks.items?.slice(0, 2).map(track => track.id).join(',') || ''
      
      // Build recommendation parameters based on mood
      const params = new URLSearchParams({
        limit: '20',
        seed_tracks: seedTracks,
        target_valence: mood.audioFeatures.valence,
        target_energy: mood.audioFeatures.energy,
        target_danceability: mood.audioFeatures.danceability,
        ...(mood.audioFeatures.instrumentalness && { target_instrumentalness: mood.audioFeatures.instrumentalness }),
        ...(mood.audioFeatures.acousticness && { target_acousticness: mood.audioFeatures.acousticness })
      })

      // If no seed tracks, use seed genres instead
      if (!seedTracks) {
        params.delete('seed_tracks')
        const genreMap = {
          happy: 'pop,dance',
          sad: 'indie,alternative',
          energetic: 'rock,electronic',
          chill: 'ambient,chill',
          focus: 'classical,ambient',
          party: 'dance,pop',
          romantic: 'r-n-b,soul',
          workout: 'rock,electronic'
        }
        params.set('seed_genres', genreMap[mood.id] || 'pop')
      }

      const recommendationsResponse = await fetch(`https://api.spotify.com/v1/recommendations?${params}`, {
        headers: {
          'Authorization': `Bearer ${accessToken}`
        }
      })

      if (!recommendationsResponse.ok) {
        throw new Error('Failed to get recommendations')
      }

      const recommendations = await recommendationsResponse.json()
      onPlaylistGenerated(recommendations.tracks || [])
    } catch (error) {
      console.error('Error generating playlist:', error)
      alert('Failed to generate playlist. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleMoodSelect = (mood) => {
    onMoodSelect(mood)
    generatePlaylist(mood)
  }

  return (
    <div className="text-center">
      <h2 className="text-3xl font-bold text-white mb-8">How are you feeling?</h2>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
        {moods.map((mood) => (
          <button
            key={mood.id}
            onClick={() => handleMoodSelect(mood)}
            disabled={isLoading}
            className={`
              relative p-6 rounded-2xl transition-all duration-300 transform hover:scale-105 
              ${selectedMood?.id === mood.id 
                ? 'ring-4 ring-white/50 scale-105' 
                : 'hover:ring-2 hover:ring-white/30'
              }
              ${isLoading ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
              bg-gradient-to-br ${mood.color} text-white font-semibold
            `}
          >
            <div className="text-4xl mb-2">{mood.emoji}</div>
            <div className="text-lg">{mood.name}</div>
            
            {selectedMood?.id === mood.id && isLoading && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/20 rounded-2xl">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
              </div>
            )}
          </button>
        ))}
      </div>

      {selectedMood && (
        <div className="mt-8 p-4 bg-white/10 backdrop-blur-md rounded-lg max-w-md mx-auto">
          <p className="text-white">
            Selected mood: <span className="font-semibold">{selectedMood.name} {selectedMood.emoji}</span>
          </p>
          {isLoading && (
            <p className="text-gray-300 mt-2">Generating your personalized playlist...</p>
          )}
        </div>
      )}
    </div>
  )
}

export default MoodSelector
