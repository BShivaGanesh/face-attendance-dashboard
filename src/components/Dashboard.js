import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FaHome, FaUser, FaUserFriends, FaFileAlt } from 'react-icons/fa';
import './Dashboard.css';

const Dashboard = () => {
  const navigate = useNavigate();
  const [details, setDetails] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [view, setView] = useState('card'); // New state for view selection

  // Fetching data from JSON
  useEffect(() => {
    axios.get('/details.json')
      .then(response => {
        const fetchedDetails = response.data.users.map(user => ({
          id: user.id,
          name: user.name,
          section: user.section,
          time_in: user.time_in,
          status: 'Present',
          image: user.profile_image,
          images: user.images
        }));
        setDetails(fetchedDetails);
      })
      .catch(error => {
        console.error("There was an error fetching the details!", error);
      });
  }, []);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleViewChange = (viewType) => {
    setView(viewType);
  };

  // Filtering cards according to search
  const filteredDetails = details.filter(emp => {
    const lowerCaseQuery = searchQuery.toLowerCase(); 
    return (
      emp.id.toString().includes(lowerCaseQuery) || 
      emp.name.toLowerCase().includes(lowerCaseQuery) ||
      emp.section.toLowerCase().includes(lowerCaseQuery) || 
      emp.time_in.toLowerCase().includes(lowerCaseQuery) || 
      emp.status.toLowerCase().includes(lowerCaseQuery)
    );
  });

  return (
    <div className="container-fluid">
      <div className="row">
        <nav className="col-md-2 d-md-block bg-body-tertiary sidebar">
          <div className="position-sticky">
            <ul className="nav flex-column">
              <li className="nav-item">
                <a className="nav-link active" aria-current="page" href="/">
                  <img src="/faceintellogo.jpg" alt="error" className="logo" />
                </a>
              </li>
              <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle" href="/" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  <FaHome style={{ marginRight: '8px' }} /> Dashboard
                </a>
                <ul className="dropdown-menu">
                  <li><a className="dropdown-item" href="/"><FaUser style={{ marginRight: '8px' }} />Dashboard-Employees</a></li>
                  <li><a className="dropdown-item" href="/dashboardVisitors"><FaUserFriends style={{ marginRight: '8px' }} />Dashboard-Visitors</a></li>
                </ul>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/reports"><FaFileAlt style={{ marginRight: '8px' }} />Reports</a>
              </li>
            </ul>
          </div>
        </nav>

        <main className="col-md-10 ms-sm-auto col-lg-10 px-md-4">
          <div className="d-flex justify-content-between align-items-center my-4">
            <h2>Face Attendance Dashboard</h2>
            <div className="dropdown">
              <button
                className="btn btn-secondary dropdown-toggle"
                type="button"
                id="viewByDropdown"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                View by
              </button>
              <ul className="dropdown-menu" aria-labelledby="viewByDropdown">
                <li>
                  <button
                    className="dropdown-item"
                    onClick={() => handleViewChange('card')}
                  >
                    Card View
                  </button>
                </li>
                <li>
                  <button
                    className="dropdown-item"
                    onClick={() => handleViewChange('table')}
                  >
                    Table View
                  </button>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Enter your search keyword"
              value={searchQuery}
              onChange={handleSearchChange}
            />
          </div>

          {/* Display cards or table based on view selection */}
          {view === 'card' ? (
            <div className="row justify-content-center my-3">
              {filteredDetails.map(emp => (
                <div className="col-md-4 col-lg-3 mb-4" key={emp.id}>
                  <div className="card card_size text-left" onClick={() => navigate(`/details/${emp.id}`)}>
                    <img
                      src={emp.image}
                      alt={emp.name}
                      className="card-img-top rounded-circle mx-auto mt-3"
                      style={{ width: '100px', height: '100px' }}
                    />
                    <div className="card-body">
                      <p className="card-text"><strong>ID:</strong> {emp.id}</p>
                      <p className="card-text"><strong>Name:</strong> {emp.name}</p>
                      <p className="card-text"><strong>Section:</strong> {emp.section}</p>
                      <p className="card-text"><strong>Time In:</strong> {emp.time_in}</p>
                      <p className="card-text"><strong>Status:</strong> {emp.status}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="table-responsive">
              <table className="table table-striped">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Section</th>
                    <th>Time In</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredDetails.map(emp => (
                    <tr key={emp.id} onClick={() => navigate(`/details/${emp.id}`)}>
                      <td>{emp.id}</td>
                      <td>{emp.name}</td>
                      <td>{emp.section}</td>
                      <td>{emp.time_in}</td>
                      <td>{emp.status}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
