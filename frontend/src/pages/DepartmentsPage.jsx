import React, { useState } from 'react';
import { Container, Row, Col, Card, Badge, Button, Nav, Tab } from 'react-bootstrap';
import { 
  FaCode, 
  FaDatabase, 
  FaRobot, 
  FaCloud, 
  FaChartLine, 
  FaUsers, 
  FaGraduationCap,
  FaAward,
  FaClock,
  FaMapMarkerAlt,
  FaEnvelope,
  FaPhone,
  FaLinkedin,
  FaStar,
  FaArrowRight,
  FaBriefcase,
  FaLightbulb,
  FaGlobe
} from 'react-icons/fa';
import { 
  FiTrendingUp, 
  FiUsers, 
  FiBookOpen, 
  FiTarget,
  FiCalendar,
  FiDollarSign,
//   FiBarChart3
} from 'react-icons/fi';
import './DepartmentsPage.css';

export const DepartmentsPage = () => {
  const [activeTab, setActiveTab] = useState('computer-applications');

  const departments = {
    'computer-applications': {
      name: 'Computer Applications',
      tagline: 'Innovating Tomorrow\'s Technology Today',
      description: 'The Department of Computer Applications at MAIMT is a premier center for technological education and innovation. We focus on developing skilled professionals who can meet the evolving demands of the IT industry through cutting-edge curriculum, hands-on learning, and industry partnerships.',
      vision: 'To be a leading department in computer applications education, fostering innovation, research excellence, and producing globally competent IT professionals.',
      mission: 'To provide quality education in computer applications, promote research and development, and bridge the gap between academia and industry through practical learning experiences.',
      deptImg: '/images/applications-dept.jpg',
      hod: {
        name: 'Dr. Meenakshi Gupta',
        qualification: 'MCA, MPhil (Comp Sc.), PhD (Comp. Sc. & App.)',
        experience: '15+ years in Academia and Industry',
        specialization: 'Data Structures, Database Management System',
        email: 'hod.ca@maimt.edu',
        phone: '+91 11 2345 6789',
        linkedin: 'linkedin.com/in/meenakshigupta',
        img: '/images/hod-computerApp.jpeg'
      },
      stats: {
        students: '850+',
        faculty: '25',
        placements: '95%',
        companies: '120+'
      },
      facilities: [
        'Advanced Computer Labs with latest hardware',
        'AI & ML Research Center',
        'Software Development Lab',
        'Cloud Computing Infrastructure',
        'Industry-Standard Development Tools',
        'Project Incubation Center'
      ],
      courses: [
        {
          id: 'bca',
          name: 'BCA',
          fullName: 'Bachelor of Computer Applications',
          duration: '3 Years',
          seats: 120,
          eligibility: '10+2 with Mathematics',
          icon: <FaCode size={32} />,
          gradient: 'from-blue-500 to-indigo-600',
          description: 'A comprehensive undergraduate program designed to provide strong foundation in computer applications, programming, and software development.',
          highlights: [
            'Industry-relevant curriculum',
            'Hands-on programming experience',
            'Project-based learning',
            'Industry internships',
            'Placement assistance'
          ],
          subjects: [
            'Programming Fundamentals (C, C++, Java)',
            'Data Structures & Algorithms',
            'Database Management Systems',
            'Web Technologies',
            'Software Engineering',
            'Computer Networks'
          ],
          careerScope: [
            'Software Developer',
            'Web Developer',
            'Database Administrator',
            'System Analyst',
            'IT Consultant',
            'Project Manager'
          ],
          averageSalary: '₹3.5 - 8 LPA',
          topRecruiters: ['TCS', 'Infosys', 'Wipro', 'Accenture', 'IBM']
        },
        {
          id: 'bca-ctis',
          name: 'BCA-CTIS',
          fullName: 'BCA in Cyber Technology & Information Security',
          duration: '3 Years',
          seats: 60,
          eligibility: '10+2 with Mathematics',
          icon: <FaDatabase size={32} />,
          gradient: 'from-purple-500 to-pink-600',
          description: 'Specialized program focusing on cybersecurity, information security, and digital forensics to meet the growing demand for security professionals.',
          highlights: [
            'Cybersecurity specialization',
            'Ethical hacking training',
            'Industry certifications',
            'Security audit projects',
            'Government partnerships'
          ],
          subjects: [
            'Network Security',
            'Ethical Hacking',
            'Digital Forensics',
            'Cryptography',
            'Cyber Laws',
            'Information Security Management'
          ],
          careerScope: [
            'Cybersecurity Analyst',
            'Ethical Hacker',
            'Security Consultant',
            'Digital Forensics Expert',
            'Information Security Manager',
            'Penetration Tester'
          ],
          averageSalary: '₹4 - 12 LPA',
          topRecruiters: ['Deloitte', 'EY', 'KPMG', 'Quick Heal', 'Symantec']
        },
        {
          id: 'bca-ai',
          name: 'BCA-AI',
          fullName: 'BCA in Artificial Intelligence',
          duration: '3 Years',
          seats: 60,
          eligibility: '10+2 with Mathematics',
          icon: <FaRobot size={32} />,
          gradient: 'from-green-500 to-teal-600',
          description: 'Cutting-edge program designed to prepare students for the AI revolution with focus on machine learning, deep learning, and intelligent systems.',
          highlights: [
            'AI/ML specialization',
            'Industry projects',
            'Research opportunities',
            'Latest AI tools & frameworks',
            'Startup incubation support'
          ],
          subjects: [
            'Machine Learning',
            'Deep Learning',
            'Natural Language Processing',
            'Computer Vision',
            'Robotics',
            'AI Ethics & Governance'
          ],
          careerScope: [
            'AI Engineer',
            'Machine Learning Engineer',
            'Data Scientist',
            'AI Research Scientist',
            'Robotics Engineer',
            'AI Product Manager'
          ],
          averageSalary: '₹5 - 15 LPA',
          topRecruiters: ['Google', 'Microsoft', 'Amazon', 'NVIDIA', 'OpenAI']
        },
        {
          id: 'mca',
          name: 'MCA',
          fullName: 'Master of Computer Applications',
          duration: '2 Years',
          seats: 60,
          eligibility: 'Bachelor\'s degree with Mathematics',
          icon: <FaCloud size={32} />,
          gradient: 'from-orange-500 to-red-600',
          description: 'Advanced postgraduate program for developing expertise in computer applications, software development, and emerging technologies.',
          highlights: [
            'Advanced programming concepts',
            'Research-oriented curriculum',
            'Industry collaborations',
            'Thesis project',
            'Leadership development'
          ],
          subjects: [
            'Advanced Algorithms',
            'Cloud Computing',
            'Big Data Analytics',
            'Mobile Application Development',
            'Software Architecture',
            'Research Methodology'
          ],
          careerScope: [
            'Senior Software Engineer',
            'Technical Lead',
            'Solutions Architect',
            'Research Scientist',
            'Technology Consultant',
            'Startup Founder'
          ],
          averageSalary: '₹6 - 20 LPA',
          topRecruiters: ['Google', 'Microsoft', 'Amazon', 'Adobe', 'Salesforce']
        }
      ]
    },
    'business-management': {
      name: 'Business Management',
      tagline: 'Shaping Future Business Leaders',
      description: 'The Department of Business Management at MAIMT is dedicated to developing dynamic business leaders and entrepreneurs. Our programs combine theoretical knowledge with practical application, preparing students for leadership roles in the global business environment.',
      vision: 'To be recognized as a center of excellence in business education, fostering entrepreneurial spirit and developing ethical business leaders for the global economy.',
      mission: 'To provide comprehensive business education that develops analytical thinking, leadership skills, and ethical values while promoting innovation and entrepreneurship.',
      deptImg: '/images/management-dept.jpg',
      hod: {
        name: 'Ms. Aneesha Chhabra',
        qualification: 'Btech (ECE), MBA',
        experience: '7+ years in Corporate and 2 years in Academia',
        specialization: 'Human Resources and Marketing',
        email: 'hod.bm@maimt.edu',
        phone: '+91 11 2345 6790',
        linkedin: 'linkedin.com/in/aneeshachhabra',
        img: '/images/hod-management.jpeg'
      },
      stats: {
        students: '650+',
        faculty: '20',
        placements: '92%',
        companies: '100+'
      },
      facilities: [
        'Bloomberg Terminal Lab',
        'Business Simulation Center',
        'Entrepreneurship Development Cell',
        'Case Study Discussion Rooms',
        'Corporate Training Center',
        'Industry Interaction Hall'
      ],
      courses: [
        {
          id: 'bba',
          name: 'BBA',
          fullName: 'Bachelor of Business Administration',
          duration: '3 Years',
          seats: 120,
          eligibility: '10+2 from any stream',
          icon: <FaChartLine size={32} />,
          gradient: 'from-blue-500 to-cyan-600',
          description: 'Comprehensive undergraduate business program that provides strong foundation in management principles, business operations, and leadership skills.',
          highlights: [
            'Industry-integrated curriculum',
            'Live project experience',
            'Internship opportunities',
            'Entrepreneurship development',
            'Global business exposure'
          ],
          subjects: [
            'Principles of Management',
            'Marketing Management',
            'Financial Management',
            'Human Resource Management',
            'Operations Management',
            'Business Analytics'
          ],
          careerScope: [
            'Business Analyst',
            'Marketing Executive',
            'HR Generalist',
            'Operations Manager',
            'Sales Manager',
            'Entrepreneur'
          ],
          averageSalary: '₹3 - 7 LPA',
          topRecruiters: ['HDFC Bank', 'ICICI Bank', 'Reliance', 'Flipkart', 'Amazon']
        },
        {
          id: 'mba',
          name: 'MBA',
          fullName: 'Master of Business Administration',
          duration: '2 Years',
          seats: 120,
          eligibility: 'Bachelor\'s degree with 50% marks',
          icon: <FaUsers size={32} />,
          gradient: 'from-purple-500 to-indigo-600',
          description: 'Premier postgraduate management program designed to develop strategic thinking, leadership capabilities, and business acumen for senior management roles.',
          highlights: [
            'Specialization tracks available',
            'Industry mentorship program',
            'International exposure',
            'Executive development programs',
            'Alumni network support'
          ],
          subjects: [
            'Strategic Management',
            'Advanced Financial Management',
            'Digital Marketing',
            'Operations Research',
            'Business Analytics',
            'Leadership & Change Management'
          ],
          careerScope: [
            'Management Consultant',
            'Investment Banker',
            'Product Manager',
            'Business Development Manager',
            'General Manager',
            'CEO/Founder'
          ],
          averageSalary: '₹8 - 25 LPA',
          topRecruiters: ['McKinsey', 'BCG', 'Deloitte', 'Goldman Sachs', 'JP Morgan']
        }
      ]
    }
  };

  const currentDept = departments[activeTab];

  return (
    <div className="dept-page">
      {/* Hero Section */}
      <section className="dept-hero">
        <Container>
          <div className="text-center">
            <h1 className="dept-hero-title">Academic Departments</h1>
            <p className="dept-hero-subtitle">
              Excellence in Education, Innovation in Learning
            </p>
          </div>
        </Container>
      </section>

      {/* Department Navigation */}
      <section className="dept-nav-section">
        <Container>
          <Nav variant="pills" className="dept-nav justify-content-center">
            <Nav.Item>
              <Nav.Link 
                className={`dept-nav-link ${activeTab === 'computer-applications' ? 'active' : ''}`}
                onClick={() => setActiveTab('computer-applications')}
              >
                <FaCode className="me-2" />
                Computer Applications
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link 
                className={`dept-nav-link ${activeTab === 'business-management' ? 'active' : ''}`}
                onClick={() => setActiveTab('business-management')}
              >
                <FiTrendingUp className="me-2" />
                Business Management
              </Nav.Link>
            </Nav.Item>
          </Nav>
        </Container>
      </section>

      {/* Department Content */}
      <Tab.Content>
        <Tab.Pane eventKey={activeTab} className="show active">
          {/* Department Overview */}
          <section className="dept-overview">
            <Container>
              <Row className="align-items-center">
                <Col lg={6}>
                  <div className="dept-overview-content">
                    <h2 className="dept-overview-title">{currentDept.name}</h2>
                    <p className="dept-overview-tagline">{currentDept.tagline}</p>
                    <p className="dept-overview-description">{currentDept.description}</p>
                    
                    <Row className="dept-stats">
                      <Col xs={6} md={3}>
                        <div className="dept-stat">
                          <div className="dept-stat-number">{currentDept.stats.students}</div>
                          <div className="dept-stat-label">Students</div>
                        </div>
                      </Col>
                      <Col xs={6} md={3}>
                        <div className="dept-stat">
                          <div className="dept-stat-number">{currentDept.stats.faculty}</div>
                          <div className="dept-stat-label">Faculty</div>
                        </div>
                      </Col>
                      <Col xs={6} md={3}>
                        <div className="dept-stat">
                          <div className="dept-stat-number">{currentDept.stats.placements}</div>
                          <div className="dept-stat-label">Placements</div>
                        </div>
                      </Col>
                      <Col xs={6} md={3}>
                        <div className="dept-stat">
                          <div className="dept-stat-number">{currentDept.stats.companies}</div>
                          <div className="dept-stat-label">Companies</div>
                        </div>
                      </Col>
                    </Row>
                  </div>
                </Col>
                <Col lg={6}>
                  <div className="dept-overview-image">
                    <img 
                      src={currentDept.deptImg}
                      alt={`${currentDept.name} Department`}
                      className="img-fluid rounded-3"
                    />
                  </div>
                </Col>
              </Row>
            </Container>
          </section>

          {/* Vision & Mission */}
          <section className="dept-vision-mission">
            <Container>
              <Row>
                <Col md={6}>
                  <Card className="dept-vm-card">
                    <Card.Body>
                      <div className="dept-vm-icon">
                        <FiTarget size={32} />
                      </div>
                      <h3 className="dept-vm-title">Our Vision</h3>
                      <p className="dept-vm-text">{currentDept.vision}</p>
                    </Card.Body>
                  </Card>
                </Col>
                <Col md={6}>
                  <Card className="dept-vm-card">
                    <Card.Body>
                      <div className="dept-vm-icon">
                        <FaLightbulb size={32} />
                      </div>
                      <h3 className="dept-vm-title">Our Mission</h3>
                      <p className="dept-vm-text">{currentDept.mission}</p>
                    </Card.Body>
                  </Card>
                </Col>
              </Row>
            </Container>
          </section>

          {/* HOD Section */}
          <section className="dept-hod">
            <Container>
              <div className="text-center mb-5">
                <h2 className="dept-section-title">Department Leadership</h2>
              </div>
              <Row className="justify-content-center">
                <Col lg={8}>
                  <Card className="dept-hod-card">
                    <Card.Body className="text-center">
                      <div className="dept-hod-avatar">
                        <img 
                          src={currentDept.hod.img}
                          alt={currentDept.hod.name}
                          className="rounded-circle"
                        />
                      </div>
                      <h3 className="dept-hod-name">{currentDept.hod.name}</h3>
                      <p className="dept-hod-title">Head of Department</p>
                      <p className="dept-hod-qualification">{currentDept.hod.qualification}</p>
                      <p className="dept-hod-experience">{currentDept.hod.experience}</p>
                      <p className="dept-hod-specialization">
                        <strong>Specialization: </strong> {currentDept.hod.specialization}
                      </p>
                      
                      <div className="dept-hod-contact">
                        <div className="dept-hod-contact-item">
                          <FaEnvelope className="me-2" />
                          {currentDept.hod.email}
                        </div>
                        <div className="dept-hod-contact-item">
                          <FaPhone className="me-2" />
                          {currentDept.hod.phone}
                        </div>
                        <div className="dept-hod-contact-item">
                          <FaLinkedin className="me-2" />
                          {currentDept.hod.linkedin}
                        </div>
                      </div>
                    </Card.Body>
                  </Card>
                </Col>
              </Row>
            </Container>
          </section>

          {/* Courses Section */}
          <section className="dept-courses">
            <Container>
              <div className="text-center mb-5">
                <h2 className="dept-section-title">Our Courses</h2>
                <p className="dept-section-subtitle">
                  Comprehensive programs designed for academic excellence and industry readiness
                </p>
              </div>
              
              <Row className="g-4">
                {currentDept.courses.map((course, index) => (
                  <Col lg={6} key={course.id}>
                    <Card className={`dept-course-card dept-course-card-${index + 1}`}>
                      <Card.Body>
                        <div className="dept-course-header">
                          <div className={`dept-course-icon dept-course-icon-${index + 1}`}>
                            {course.icon}
                          </div>
                          <div className="dept-course-basic">
                            <h3 className="dept-course-name">{course.name}</h3>
                            <p className="dept-course-full-name">{course.fullName}</p>
                            <div className="dept-course-meta">
                              <Badge className="dept-course-duration">
                                <FaClock className="me-1" />
                                {course.duration}
                              </Badge>
                              <Badge className="dept-course-seats">
                                <FaUsers className="me-1" />
                                {course.seats} Seats
                              </Badge>
                            </div>
                          </div>
                        </div>
                        
                        <p className="dept-course-description">{course.description}</p>
                        
                        <div className="dept-course-details">
                          <div className="dept-course-detail-section">
                            <h5 className="dept-course-detail-title">
                              <FaStar className="me-2" />
                              Key Highlights
                            </h5>
                            <ul className="dept-course-list">
                              {course.highlights.map((highlight, idx) => (
                                <li key={idx}>{highlight}</li>
                              ))}
                            </ul>
                          </div>
                          
                          <div className="dept-course-detail-section">
                            <h5 className="dept-course-detail-title">
                              <FiBookOpen className="me-2" />
                              Core Subjects
                            </h5>
                            <ul className="dept-course-list">
                              {course.subjects.slice(0, 4).map((subject, idx) => (
                                <li key={idx}>{subject}</li>
                              ))}
                              {course.subjects.length > 4 && (
                                <li className="text-muted">+{course.subjects.length - 4} more subjects</li>
                              )}
                            </ul>
                          </div>
                          
                          <div className="dept-course-detail-section">
                            <h5 className="dept-course-detail-title">
                              <FaBriefcase className="me-2" />
                              Career Opportunities
                            </h5>
                            <ul className="dept-course-list">
                              {course.careerScope.slice(0, 4).map((career, idx) => (
                                <li key={idx}>{career}</li>
                              ))}
                            </ul>
                          </div>
                          
                          <div className="dept-course-footer">
                            <div className="dept-course-salary">
                              <FiDollarSign className="me-2" />
                              <strong>Average Salary: </strong> {course.averageSalary}
                            </div>
                            <div className="dept-course-recruiters">
                              <strong>Top Recruiters: </strong> {course.topRecruiters.slice(0, 3).join(', ')}
                            </div>
                          </div>
                        </div>
                        
                        {/* <div className="dept-course-actions">
                          <Button className="dept-course-btn-primary">
                            Learn More
                            <FaArrowRight className="ms-2" />
                          </Button>
                          <Button variant="outline-primary" className="dept-course-btn-secondary">
                            Apply Now
                          </Button>
                        </div> */}
                      </Card.Body>
                    </Card>
                  </Col>
                ))}
              </Row>
            </Container>
          </section>

          {/* Facilities Section */}
          <section className="dept-facilities">
            <Container>
              <div className="text-center mb-5">
                <h2 className="dept-section-title">World-Class Facilities</h2>
                <p className="dept-section-subtitle">
                  State-of-the-art infrastructure supporting academic excellence
                </p>
              </div>
              
              <Row className="g-4">
                {currentDept.facilities.map((facility, index) => (
                  <Col md={6} lg={4} key={index}>
                    <Card className="dept-facility-card">
                      <Card.Body className="text-center">
                        <div className="dept-facility-icon">
                          <FaAward size={24} />
                        </div>
                        <h5 className="dept-facility-title">{facility}</h5>
                      </Card.Body>
                    </Card>
                  </Col>
                ))}
              </Row>
            </Container>
          </section>
        </Tab.Pane>
      </Tab.Content>
    </div>
  );
};

