import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import ArtistPage from './pages/artist';
import HomePage from './pages/home';
import LoginPage from './pages/login';
import SonglistPage from './pages/songlist';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" index element={<LoginPage />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/artist" element={<ArtistPage />} />
          <Route path="/songlist" element={<SonglistPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
