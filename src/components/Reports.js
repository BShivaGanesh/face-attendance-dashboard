import React, { useState } from 'react';
import { format, subDays } from 'date-fns';
import './Dashboard.css';
import { FaHome, FaUser, FaUserFriends, FaFileAlt } from 'react-icons/fa';


const Reports = () => {
  const [filter, setFilter] = useState({
    department: '',
    date: format(new Date(), 'yyyy-MM-dd'),
    startTime: '09:00',
    endTime: '18:00',
  });

  const handleFilterChange = e => {
    setFilter({
      ...filter,
      [e.target.name]: e.target.value,
    });
  };

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
                <a
                  className="nav-link dropdown-toggle"
                  href="/"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                 <FaHome style={{ marginRight: '8px' }} /> Dashboard
                </a>
                <ul className="dropdown-menu">
                  <li>
                    <a className="dropdown-item" href="/">
                    <FaUser style={{ marginRight: '8px' }} /> Dashboard-Employees
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="/dashboardVisitors">
                    <FaUserFriends style={{ marginRight: '8px' }} />Dashboard-Visitors
                    </a>
                  </li>
                </ul>
              </li>

              <li className="nav-item">
                <a className="nav-link" href="/reports">
                <FaFileAlt style={{ marginRight: '8px' }} /> Reports
                </a>
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
          <h2 className="text-center my-4">Face Attendance Reports</h2>

          <div className="row mb-4">
            <div className="col-md-3">
              <label className="form-label">Department</label>
              <input
                type="text"
                name="department"
                value={filter.department}
                onChange={handleFilterChange}
                placeholder="Search Section"
                className="form-control"
              />
            </div>

            <div className="col-md-3">
              <label className="form-label">Date</label>
              <input
                type="date"
                name="date"
                value={filter.date}
                onChange={handleFilterChange}
                className="form-control"
              />
            </div>

            <div className="col-md-3">
              <label className="form-label">Start Time</label>
              <input
                type="time"
                name="startTime"
                value={filter.startTime}
                onChange={handleFilterChange}
                className="form-control"
              />
            </div>

            <div className="col-md-3">
              <label className="form-label">End Time</label>
              <input
                type="time"
                name="endTime"
                value={filter.endTime}
                onChange={handleFilterChange}
                className="form-control"
              />
            </div>
          </div>

          <div className="table-responsive">
            <table className="table table-bordered table-striped">
              <thead className="table-dark">
                <tr>
                  <th>Date</th>
                  <th>Present</th>
                  <th>Absent</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {[...Array(10)].map((_, idx) => (
                  <tr key={idx}>
                    <td>{format(subDays(new Date(), idx), 'dd-MM-yyyy')}</td>
                    <td>{Math.floor(Math.random() * 500)}</td>
                    <td>{Math.floor(Math.random() * 200)}</td>
                    <td>
                      <button className="btn btn-outline-dark btn-sm me-2">Download CSV</button>
                      <button className="btn btn-outline-dark btn-sm">Download PDF</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          
        </main>
      </div>
    </div>
  );
};

export default Reports;