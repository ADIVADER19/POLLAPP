import './App.css';
import { BrowserRouter as Router ,Routes, Route} from "react-router-dom";
import NavBar from './components/NavBar';
import Homepage from './components/Homepage';
import Vpoll from './components/Vpoll';
import LivepollT from './components/LivepollT';
import Signup from './components/Signup';
import { useNavigate } from 'react-router';
import Closepoll from './components/Closepoll'
import PollStu from './components/PollStu'
import CreatePoll2 from "./components/CreatePoll2";
import ViewLobby from "./components/ViewLobby";
import ViewLobbyPoll from "./components/ViewLobbyPoll";
function App() {
  return (
    <div className="app">
      <Router>
        <Routes>
          <Route path="/login" element={<Login />}/>
          <Route path="/signin" element={<Signup />}/>
          <Route path="/" element={<><NavBar /><Homepage /></>}/>
          <Route path="/vpoll" element={<Vpoll />}/>
          <Route path="/livepollT" element={<LivepollT />}/>
          <Route path="/closepoll" element={<Closepoll />}/>
          <Route path="/pollStu" element={<PollStu />}/>
          <Route path="/poll/:createid" element={<CreatePoll2/>}/>
          <Route path="/view_lobby" element={<><NavBar/><ViewLobby/></>}/>
          <Route path="/view_lobby_poll/:i" element={<ViewLobbyPoll/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default (App);
