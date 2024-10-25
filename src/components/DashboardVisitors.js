import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FaHome , FaUser, FaUserFriends, FaFileAlt } from 'react-icons/fa';
import './Dashboard.css';

const DashboardVisitors = () => {
  const navigate = useNavigate();
  const [details, setDetails] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
//fetching data from json
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

  //filtering cards acc to search
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
                  FACEINTEL
                </a>
              </li>
              
              <li class="nav-item dropdown">
          <a class="nav-link dropdown-toggle" href="/" role="button" data-bs-toggle="dropdown" aria-expanded="false">
          <FaHome style={{ marginRight: '8px' }} />Dashboard
          </a>
          <ul class="dropdown-menu">
            <li><a class="dropdown-item" href="/"><FaUser style={{ marginRight: '8px' }} />Dashboard-Employees</a></li>
            <li><a class="dropdown-item" href="/dashboardVisitors"><FaUserFriends style={{ marginRight: '8px' }} />Dashboard-Visitors</a></li>
            
          </ul>
        </li>
              <li className="nav-item">
                <a className="nav-link" href="/reports"><FaFileAlt style={{ marginRight: '8px' }} />Reports</a>
              </li>
            </ul>
            <div className="mt-4">
              <div className="d-flex justify-content-between">
                <button className="btn btn-light">
                  <i className="fa fa-bell"></i>
                </button>
                <button className="btn btn-light">
                  <i className="fa fa-sun"></i>
                </button>
              </div>
            </div>
          </div>
        </nav>

        <main className="col-md-10 ms-sm-auto col-lg-10 px-md-4">
          <h2 className="text-center my-4">Face Attendance Dashboard-Visitors</h2>
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Enter your search key word"
              value={searchQuery}
              onChange={handleSearchChange}
            />
          
          </div>
          {/* getting the data from json and putting them in cards */}
          <div className="row justify-content-center my-3">
            {filteredDetails.map(emp => (
              <div className="col-md-4 col-lg-3 mb-4" key={emp.id}>
                {/* on clicking on card routing to the details page at id */}
                <div className="card text-left" onClick={() => navigate(`/details/${emp.id}`)}>
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
        </main>
      </div>
    </div>
  );
};

export default DashboardVisitors;