import './App.css';
import React from 'react';
import Homepage from './Components/Homepage';
import {Routes, Route, Link} from 'react-router-dom';
import FilterGroup from './Components/FilterGroup';
import ReservationFilter from './Components/ReservationFilter';
import Reservation from './Components/Reservation';
import Group from './Components/Group';

function App() {
  return (
    <div>
      <nav className="nav">
        <Link to="/react_proj" className='nav-item'>Homepage</Link>
        <Link to="/yoursignups" className="nav-item">Your Sign Ups</Link>
        <Link to="/groups" className='nav-item'>Groups</Link>
      </nav>
      <Routes>
        <Route path="/react_proj" element ={<Homepage/>}/>
        <Route path="/yoursignups" element={<ReservationFilter/>}/>
        <Route path="/groups" element = {<Group/>}/>
      </Routes>
    </div>
  );
};

export default App;
