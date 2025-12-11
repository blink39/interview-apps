import React, { useState, useMemo } from 'react';
import './Dashboard.css';
import logo from './logo.svg';

function Dashboard({ onLogout }) {
  // Dummy data for the table
  const [admissions, setAdmissions] = useState([
    { id: 1, patient: 'John Doe', age: 45, doctor: 'Dr. Smith', time: '09:00 AM' },
    { id: 2, patient: 'Jane Smith', age: 32, doctor: 'Dr. Johnson', time: '10:30 AM' },
    { id: 3, patient: 'Sam Wilson', age: 28, doctor: 'Dr. Brown', time: '11:15 AM' },
    { id: 4, patient: 'Emily Davis', age: 54, doctor: 'Dr. Wilson', time: '01:45 PM' },
  ]);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'ascending' });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newAdmission, setNewAdmission] = useState({
    patient: '',
    age: '',
    doctor: '',
    time: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewAdmission({ ...newAdmission, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const id = admissions.length + 1;
    setAdmissions([...admissions, { id, ...newAdmission }]);
    setIsModalOpen(false);
    setNewAdmission({ patient: '', age: '', doctor: '', time: '' });
  };

  const sortedAdmissions = useMemo(() => {
    let sortableItems = [...admissions];
    if (sortConfig.key !== null) {
      sortableItems.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableItems;
  }, [admissions, sortConfig]);

  const requestSort = (key) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  const getClassNameFor = (name) => {
    if (sortConfig.key === name) {
      return sortConfig.direction === 'ascending' ? 'sorted-asc' : 'sorted-desc';
    }
  };

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <div className="header-left">
          <img src={logo} alt="AIDO Hospital Logo" className="hospital-logo" />
          <h1>AIDO Hospital</h1>
        </div>
        <button className="logout-button" onClick={onLogout}>Logout</button>
      </header>

      <main className="dashboard-main">
        <section className="stats-section">
          <div className="stat-card">
            <h3>Total Admissions</h3>
            <div className="graph-placeholder">
              {/* Simple CSS Bar Chart Representation */}
              <div className="bar" style={{ height: '40%' }}></div>
              <div className="bar" style={{ height: '70%' }}></div>
              <div className="bar" style={{ height: '50%' }}></div>
              <div className="bar" style={{ height: '90%' }}></div>
              <div className="bar" style={{ height: '60%' }}></div>
            </div>
          </div>
          <div className="stat-card">
            <h3>Total Transactions</h3>
            <div className="graph-placeholder">
               {/* Simple CSS Bar Chart Representation */}
              <div className="bar" style={{ height: '30%' }}></div>
              <div className="bar" style={{ height: '50%' }}></div>
              <div className="bar" style={{ height: '80%' }}></div>
              <div className="bar" style={{ height: '40%' }}></div>
              <div className="bar" style={{ height: '75%' }}></div>
            </div>
          </div>
        </section>

        <section className="table-section">
          <div className="table-header">
            <h3>Today's Admissions</h3>
            <button className="add-regis-button" onClick={() => setIsModalOpen(true)}>Add Regis</button>
          </div>
          <table className="admissions-table">
            <thead>
              <tr>
                <th onClick={() => requestSort('patient')} className={`sortable ${getClassNameFor('patient') || ''}`}>
                  Patient Name
                </th>
                <th onClick={() => requestSort('age')} className={`sortable ${getClassNameFor('age') || ''}`}>
                  Age
                </th>
                <th>Doctor Name</th>
                <th>Time of Consultation</th>
              </tr>
            </thead>
            <tbody>
              {sortedAdmissions.map((admission) => (
                <tr key={admission.id}>
                  <td>{admission.patient}</td>
                  <td>{admission.age}</td>
                  <td>{admission.doctor}</td>
                  <td>{admission.time}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      </main>

      <footer className="dashboard-footer">
        <p>copyright aido@2025</p>
      </footer>

      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>Add Registration</h2>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Patient Name</label>
                <input type="text" name="patient" value={newAdmission.patient} onChange={handleInputChange} required />
              </div>
              <div className="form-group">
                <label>Age</label>
                <input type="number" name="age" value={newAdmission.age} onChange={handleInputChange} required />
              </div>
              <div className="form-group">
                <label>Doctor Name</label>
                <input type="text" name="doctor" value={newAdmission.doctor} onChange={handleInputChange} required />
              </div>
              <div className="form-group">
                <label>Consultation Time</label>
                <input type="time" name="time" value={newAdmission.time} onChange={handleInputChange} required />
              </div>
              <div className="modal-actions">
                <button type="button" className="cancel-button" onClick={() => setIsModalOpen(false)}>Cancel</button>
                <button type="submit" className="submit-button">Submit</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Dashboard;