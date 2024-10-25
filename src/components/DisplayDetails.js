import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { FaHome , FaUser, FaUserFriends, FaFileAlt } from 'react-icons/fa';
import './Dashboard.css'; 

export default function DisplayDetails() {
  const { id } = useParams();
  const [userDetails, setUserDetails] = useState(null);
  

  useEffect(() => {
    axios.get('/details.json')
      .then(response => {
        const user = response.data.users.find(user => user.id === parseInt(id));
        if (user) {
          setUserDetails(user);
        } else {
          console.error("User not found");
        }
      })
      .catch(error => console.error("Error fetching user details:", error));
  }, [id]);

  if (!userDetails) {
    return <div>Loading...</div>;
  }

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
          <div className="container mt-5 d-flex">
            <div className="card text-left" style={{ width: '18rem' }}>
              <div className="card-header">
                <h4>User Details</h4>
              </div>
              <div className="card-body">
                <img
                  src={userDetails.profile_image}
                  alt={userDetails.name}
                  className="rounded-circle mb-3"
                  style={{ width: '150px', height: '150px' }}
                />
                <h5 className="card-title">{userDetails.name}</h5>
                <p className="card-text"><strong>ID:</strong> {userDetails.id}</p>
                <p className="card-text"><strong>Section:</strong> {userDetails.section}</p>
                <p className="card-text"><strong>Time In:</strong> {userDetails.time_in}</p>
                <p className="card-text"><strong>Status:</strong> Present</p>
              </div>
              <div className="card-footer text-muted">
                {new Date().toLocaleDateString()}
              </div>
            </div>

            <div className="ml-5 mx-3">
  <h4>Images</h4>
  <div className="d-flex flex-wrap">
    {userDetails.images.map((image, index) => (
      <label key={index} className="position-relative m-2">
        <input
          type="checkbox"
          className="position-absolute"
          style={{ top: '10px', right: '10px', zIndex: 1 }}
        />
        <img
          src={image}
          alt={`User ${userDetails.name} - ${index + 1}`}
          className="img-fluid"
          style={{ width: '150px', height: '150px', objectFit: 'cover' }}
        />
      </label>
    ))}
  </div>
              <button className="btn btn-success my-3 mx-3">Add images</button>
              <button className="btn btn-danger my-3 mx-3">Remove images</button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}