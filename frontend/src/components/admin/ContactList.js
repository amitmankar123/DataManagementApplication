// import React, { useState, useEffect } from 'react';
// import api from '../../services/api';

// const ContactList = () => {
//   const [contacts, setContacts] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState('');

//   useEffect(() => {
//     fetchContacts();
//   }, []);

//   const fetchContacts = async () => {
//     try {
//       setLoading(true);
//       const response = await api.get('/contact/getContactForm');
//       setContacts(Array.isArray(response.data) ? response.data: []);
//       setError('');
//     } catch (error) {
//       setError('Backend not available. Please ensure your API server is running.');
//       setContacts([]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <>
//       <div className="admin-header admin-card">
//         <h1 className="admin-title">Contact Form Details</h1>
//         <p className="admin-subtitle">View all contact form submissions</p>
//       </div>
//       <div className="admin-card">
//         <h3 style={{marginBottom: 20}}>Contact Inquiries</h3>
//         {error && <div className="toast error">{error}</div>}
//         <div className="admin-table">
//           <table className="table">
//             <thead>
//               <tr>
//                 <th>S.No</th>
//                 <th>Full Name</th>
//                 <th>Email</th>
//                 <th>Mobile Number</th>
//                 <th>City</th>
//                 {/* <th>Submission Date</th> */}
//                 <th>Actions</th>
//               </tr>
//             </thead>
//             <tbody>
//               {contacts.map((contact, idx) => (
//                 <tr key={contact._id || idx}>
//                   <td>{idx + 1}</td>
//                   <td>{contact.Full_name || contact.name || 'N/A'}</td>
//                   <td>{contact.email || contact.Email || 'N/A'}</td>
//                   <td>{contact.Mobile_number || contact.phone || 'N/A'}</td>
//                   <td>{contact.City || contact.city || 'N/A'}</td>
//                   {/* <td>{contact.createdAt ? contact.createdAt.slice(0, 10) : 'N/A'}</td> */}
//                   <td>
//                     {/* <button className="btn btn-success" style={{marginRight: 8, padding: '6px 10px'}} title="View"><i className="fa-solid fa-eye"></i></button> */}
//                     <button className="btn btn-danger" style={{padding: '6px 10px'}} title="Delete"><i className="fa-solid fa-trash">delete</i></button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </>
//   );
// };


import React, { useState, useEffect } from 'react';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import api from '../../services/api';

const ContactList = () => {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    try {
      setLoading(true);
      const response = await api.get('/contact/getContactForm');
      setContacts(Array.isArray(response.data) ? response.data : []);
      setError('');
    } catch (error) {
      setError('Backend not available. Please ensure your API server is running.');
      setContacts([]);
    } finally {
      setLoading(false);
    }
  };

  const downloadPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text('Contact Form Submissions', 14, 22);

    const tableData = contacts.map((contact) => [
      contact.Full_name || contact.name || 'N/A',
      contact.email || contact.Email || 'N/A',
      contact.Mobile_number || contact.phone || 'N/A',
      contact.City || contact.city || 'N/A',
      contact.createdAt ? contact.createdAt.slice(0, 10) : 'N/A'
    ]);

    autoTable(doc, {
      startY: 30,
      head: [['Full Name', 'Email', 'Mobile Number', 'City', 'Date']],
      body: tableData
    });

    doc.save('contact_list.pdf');
  };

  return (
    <>
      <div className="admin-header admin-card">
        <h1 className="admin-title">Contact Form Details</h1>
        <p className="admin-subtitle">View all contact form submissions</p>
      </div>

      <div className="admin-card">
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 20 }}>
          <h3>Contact Inquiries</h3>
          <button className="btn btn-success" onClick={downloadPDF}>
            <i className="fa-solid fa-file-pdf"></i> Download PDF
          </button>
        </div>

        {error && <div className="toast error">{error}</div>}

        <div className="admin-table">
          <table className="table">
            <thead>
              <tr>
                <th>Full Name</th>
                <th>Email</th>
                <th>Mobile Number</th>
                <th>City</th>
                <th>Submission Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {contacts.map((contact, idx) => (
                <tr key={contact._id || idx}>
                  <td>{contact.Full_name || contact.name || 'N/A'}</td>
                  <td>{contact.email || contact.Email || 'N/A'}</td>
                  <td>{contact.Mobile_number || contact.phone || 'N/A'}</td>
                  <td>{contact.City || contact.city || 'N/A'}</td>
                  <td>{contact.createdAt ? contact.createdAt.slice(0, 10) : 'N/A'}</td>
                  <td>
                    <button
                      className="btn btn-danger"
                      style={{ padding: '6px 10px' }}
                      title="Delete"
                    >
                      <i className="fa-solid fa-trash">delete</i>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default ContactList;
