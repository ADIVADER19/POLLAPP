import './App.css';
import { BrowserRouter as Router ,Routes, Route} from "react-router-dom";
import NavBar from './components/NavBar';
import Homepage from './components/Homepage';
import Vpoll from './components/Vpoll';
import LivepollT from './components/LivepollT';
import { useNavigate } from 'react-router';
import Closepoll from './components/Closepoll'
import PollStu from './components/PollStu'
import CreatePoll2 from "./components/CreatePoll2";
import Profile from "./components/Profile";
function App() {
  return (
    <div className="app">
      <Router>
        <Routes>
          <Route path="/" element={<><NavBar /><Homepage /></>}/>
          <Route path="/vpoll" element={<Vpoll />}/>
          <Route path="/profile" element={<Profile />}/>
          <Route path="/livepollT/:stuid" element={<LivepollT />}/>
          <Route path="/closepoll/:stuid" element={<Closepoll />}/>
          <Route path="/pollStu/:stuid" element={<PollStu />}/>
          <Route path="/poll/:createid" element={<CreatePoll2/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default (App);
