import './App.css';
import NavBar from './components/NavBar';
import Homepage from './components/Homepage'
import Poll from './components/Poll'
import Vpoll from './components/Vpoll'
import LivepollT from './components/LivepollT'
import { BrowserRouter as Router ,Routes, Route} from "react-router-dom";
import Signup from './components/Signup';
import Login from './components/Login'
import { useNavigate } from 'react-router';


function App() {
  return (
    <div className="app">
      <Router>
        <Routes>
          <Route path="/" element={<Login />}/>
          <Route path="/signin" element={<Signup />}/>
          <Route path="/home" element={<Homepage />}/>
          <Route path="/poll/:id" element={<Poll />}/>
          <Route path="/vpoll" element={<Vpoll />}/>
          <Route path="/LivepollT" element={<LivepollT />}/>
        </Routes>
      </Router>
    </div>
  );
}

export default (App);
