import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import LoginPage from './pages/login';

function Routers() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/addsong" />
        <Route path="/songlist" />
      </Routes>
    </Router>
  );
}

export default Routers;