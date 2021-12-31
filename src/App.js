import './App.css';
import NavBar from './components/NavBar';
import Homepage from './components/Homepage';
import Poll from './components/Poll';
import Vpoll from './components/Vpoll';
import { BrowserRouter as Router ,Routes, Route} from "react-router-dom";
import { useNavigate } from 'react-router';


function App() {
  return (
    <div className="app">
      <Router>
        <Routes>
          <Route path="/" element={<Homepage />}/>
          <Route path="/poll/:id" element={<Poll />}/>
          <Route path="/vpoll" element={<Vpoll />}/>
        </Routes>
      </Router>
    </div>
  );
}

export default (App);
