import "./App.css";
import LoginPage from "./pages/login";

function App() {
  return (
    <div className="App">
      
      <LoginPage />
      {/* <BrowserRouter>
        <SideBar />
        <Routes>
          <Route path="/home" element={<HomePage />} />
          <Route path="/artist" element={<ArtistPage />} />
          <Route path="/songlist" element={<SonglistPage />} />
        </Routes>
      </BrowserRouter> */}
    </div>
  );
}

export default App;
