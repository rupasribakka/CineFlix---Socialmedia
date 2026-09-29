import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import ProtectedRoute from './components/ProtectedRoute'
import { AuthProvider } from './context/AuthContext'
import { PlayerProvider } from './context/PlayerContext'
import { ProfileProvider } from './context/ProfileContext'
import { WatchlistProvider } from './context/WatchlistContext'
import Browse from './pages/Browse'
import Login from './pages/Login'
import MovieDetails from './pages/MovieDetails'
import Movies from './pages/Movies'
import MyList from './pages/MyList'
import NotFound from './pages/NotFound'
import Profiles from './pages/Profiles'
import SearchPage from './pages/Search'
import Settings from './pages/Settings'
import TVDetails from './pages/TVDetails'
import TVShows from './pages/TVShows'
import Watch from './pages/Watch'

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/browse" replace />} />
      <Route path="/login" element={<Login />} />
      <Route path="/profiles" element={<ProtectedRoute><Profiles /></ProtectedRoute>} />
      <Route path="/profile/:id" element={<ProtectedRoute><Profiles /></ProtectedRoute>} />
      <Route path="/browse" element={<ProtectedRoute><Browse /></ProtectedRoute>} />
      <Route path="/movies" element={<ProtectedRoute><Movies /></ProtectedRoute>} />
      <Route path="/tv-shows" element={<ProtectedRoute><TVShows /></ProtectedRoute>} />
      <Route path="/search" element={<ProtectedRoute><SearchPage /></ProtectedRoute>} />
      <Route path="/my-list" element={<ProtectedRoute><MyList /></ProtectedRoute>} />
      <Route path="/movie/:id" element={<ProtectedRoute><MovieDetails /></ProtectedRoute>} />
      <Route path="/tv/:id" element={<ProtectedRoute><TVDetails /></ProtectedRoute>} />
      <Route path="/watch/:id" element={<ProtectedRoute><Watch /></ProtectedRoute>} />
      <Route path="/settings" element={<ProtectedRoute><Settings /></ProtectedRoute>} />
      <Route path="/404" element={<NotFound />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}

export default function App() {
  return (
    <AuthProvider>
      <ProfileProvider>
        <WatchlistProvider>
          <PlayerProvider>
            <BrowserRouter>
              <AppRoutes />
            </BrowserRouter>
          </PlayerProvider>
        </WatchlistProvider>
      </ProfileProvider>
    </AuthProvider>
  )
}
