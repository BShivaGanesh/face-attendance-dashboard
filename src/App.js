import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import DashboardVisitors from './components/DashboardVisitors';
import Reports from './components/Reports';
import DisplayDetails from './components/DisplayDetails';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/dashboardVisitors" element={<DashboardVisitors />} />
        <Route path="/reports" element={<Reports />} />
        <Route path="/details/:id" element={<DisplayDetails />}></Route>
      </Routes>
    </Router>
  );
}

export default App;
