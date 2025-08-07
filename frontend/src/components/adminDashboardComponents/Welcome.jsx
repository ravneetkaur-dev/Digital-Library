import React, { useState, useRef } from "react";
import { Container, Row, Col, Image, Dropdown, Navbar } from "react-bootstrap";
import { FaBell, FaUserCircle } from "react-icons/fa";
import "./Welcome.css";

export const Welcome = () => {
  const [profileImage, setProfileImage] = useState(null);
  const fileInputRef = useRef(null);

  const notifications = [
    { message: "New feedback received" },
    { message: "Faculty report submitted" },
    { message: "Reminder: Monthly analytics due" }
  ];

  const handleIconClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfileImage(URL.createObjectURL(file));
    }
  };

  return (
    <>
      {/* Navbar-style top bar */}
      <Navbar className="admin-navbar shadow-sm" expand="lg">
        <Container fluid className="justify-content-between">
          <h4 className="admin-title m-0">Admin Dashboard</h4>

          <div className="d-flex align-items-center gap-4">
            {/* Notification Bell */}
            <Dropdown align="end">
              <Dropdown.Toggle variant="link" id="notification-dropdown" className="notification-icon">
                <FaBell size={20} />
                {notifications.length > 0 && (
                  <span className="notification-badge">{notifications.length}</span>
                )}
              </Dropdown.Toggle>

              <Dropdown.Menu className="notification-dropdown-menu">
                {notifications.length === 0 ? (
                  <Dropdown.Item>No new notifications</Dropdown.Item>
                ) : (
                  notifications.map((notification, index) => (
                    <Dropdown.Item key={index}>{notification.message}</Dropdown.Item>
                  ))
                )}
              </Dropdown.Menu>
            </Dropdown>

            {/* Profile Icon */}
            <div className="profile-section" onClick={handleIconClick} style={{ cursor: "pointer" }}>
              {profileImage ? (
                <Image src={profileImage} roundedCircle height={35} width={35} />
              ) : (
                <FaUserCircle size={35} />
              )}
              <input
                type="file"
                accept="image/*"
                style={{ display: "none" }}
                ref={fileInputRef}
                onChange={handleFileChange}
              />
            </div>
          </div>
        </Container>
      </Navbar>

      {/* Welcome Message */}
      <Container className="mt-5">
        <Row className="justify-content-center">
          <Col md={10} lg={8}>
            <div className="welcome-card p-4 rounded shadow text-center">
              <h2 className="mb-3">Welcome to the Admin Dashboard</h2>
              <p className="lead">
                Monitor, manage, and make decisions efficiently. Use the sidebar to access all admin features.
              </p>
            </div>
          </Col>
        </Row>

        {/* Admin Info Card */}
        <Row className="justify-content-center mt-4">
          <Col md={10} lg={8}>
            <div className="admin-info-card p-4 rounded shadow d-flex align-items-center gap-4">
              {profileImage ? (
                <Image src={profileImage} roundedCircle height={70} width={70} />
              ) : (
                <FaUserCircle size={70} />
              )}
              <div>
                <h5 className="mb-1">Admin Name</h5>
                <p className="mb-0">admin@example.com</p>
                <small>Role: Super Admin</small>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
};


// import React, { useEffect, useState, useRef } from "react";
// import { Container, Row, Col, Image, Dropdown, Navbar, Spinner } from "react-bootstrap";
// import { FaBell, FaUserCircle } from "react-icons/fa";
// import axios from "axios";
// import "./Welcome.css";

// export const Welcome = () => {
//   const [adminData, setAdminData] = useState(null);
//   const [profileImagePreview, setProfileImagePreview] = useState(null);
//   const fileInputRef = useRef(null);
//   const [loading, setLoading] = useState(true);

//   const notifications = [
//     { message: "New feedback received" },
//     { message: "Faculty report submitted" },
//     { message: "Reminder: Monthly analytics due" }
//   ];

//   const fetchAdminDetails = async () => {
//     try {
//       const res = await axios.get("http://localhost:5000/api/admin/getdetails", {
//         withCredentials: true
//       });
//       setAdminData(res.data);
//       setLoading(false);
//     } catch (err) {
//       console.error("Admin fetch error:", err);
//       setLoading(false);
//     }
//   };

//   const handleIconClick = () => {
//     fileInputRef.current.click();
//   };

//   const handleFileChange = async (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       setProfileImagePreview(URL.createObjectURL(file));

//       // Optional: Upload the image to backend
//       const formData = new FormData();
//       formData.append("profileImage", file);

//       try {
//         await axios.patch("http://localhost:5000/api/admin/uploadProfilePic", formData, {
//           withCredentials: true,
//           headers: {
//             "Content-Type": "multipart/form-data"
//           }
//         });
//         fetchAdminDetails(); // Refresh details
//       } catch (err) {
//         console.error("Image upload error:", err);
//       }
//     }
//   };

//   useEffect(() => {
//     fetchAdminDetails();
//   }, []);

//   return (
//     <>
//       {/* Navbar-style top bar */}
//       <Navbar className="admin-navbar shadow-sm" expand="lg">
//         <Container fluid className="justify-content-between">
//           <h4 className="admin-title mb-0">Admin Dashboard</h4>

//           <div className="d-flex align-items-center gap-4">
//             {/* Notification Bell */}
//             <Dropdown align="end">
//               <Dropdown.Toggle variant="link" id="notification-dropdown" className="notification-icon">
//                 <FaBell size={20} />
//                 {notifications.length > 0 && (
//                   <span className="notification-badge">{notifications.length}</span>
//                 )}
//               </Dropdown.Toggle>

//               <Dropdown.Menu className="notification-dropdown-menu">
//                 {notifications.length === 0 ? (
//                   <Dropdown.Item>No new notifications</Dropdown.Item>
//                 ) : (
//                   notifications.map((notification, index) => (
//                     <Dropdown.Item key={index}>{notification.message}</Dropdown.Item>
//                   ))
//                 )}
//               </Dropdown.Menu>
//             </Dropdown>

//             {/* Profile Icon */}
//             <div className="profile-section" onClick={handleIconClick} style={{ cursor: "pointer" }}>
//               {profileImagePreview ? (
//                 <Image src={profileImagePreview} roundedCircle height={35} width={35} />
//               ) : adminData?.profileImage ? (
//                 <Image src={adminData.profileImage} roundedCircle height={35} width={35} />
//               ) : (
//                 <FaUserCircle size={35} />
//               )}
//               <input
//                 type="file"
//                 accept="image/*"
//                 style={{ display: "none" }}
//                 ref={fileInputRef}
//                 onChange={handleFileChange}
//               />
//             </div>
//           </div>
//         </Container>
//       </Navbar>

//       {/* Welcome Message */}
//       <Container className="mt-5">
//         {loading ? (
//           <div className="text-center">
//             <Spinner animation="border" />
//           </div>
//         ) : (
//           <>
//             <Row className="justify-content-center">
//               <Col md={10} lg={8}>
//                 <div className="welcome-card p-4 rounded shadow text-center">
//                   <h2 className="mb-3">Welcome to the Admin Dashboard</h2>
//                   <p className="lead">
//                     Monitor, manage, and make decisions efficiently. Use the sidebar to access all admin features.
//                   </p>
//                 </div>
//               </Col>
//             </Row>

//             {/* Admin Info Card */}
//             <Row className="justify-content-center mt-4">
//               <Col md={10} lg={8}>
//                 <div className="admin-info-card p-4 rounded shadow d-flex align-items-center gap-4">
//                   {profileImagePreview ? (
//                     <Image src={profileImagePreview} roundedCircle height={70} width={70} />
//                   ) : adminData?.profileImage ? (
//                     <Image src={adminData.profileImage} roundedCircle height={70} width={70} />
//                   ) : (
//                     <FaUserCircle size={70} />
//                   )}
//                   <div>
//                     <h5 className="mb-1">{adminData?.name || "Admin"}</h5>
//                     <p className="mb-0">{adminData?.email || "admin@example.com"}</p>
//                     <small>Role: {adminData?.role || "Super Admin"}</small>
//                   </div>
//                 </div>
//               </Col>
//             </Row>
//           </>
//         )}
//       </Container>
//     </>
//   );
// };
